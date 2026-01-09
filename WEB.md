# Perfumes Store Web (Frontend) — README

Frontend web para una tienda de perfumes, construido para consumir la **Perfumes Store API**. Incluye:
- Catálogo (listado y detalle de perfumes)
- Carrito (agregar, actualizar, eliminar)
- Login con Google (OIDC vía Google Identity Services)
- Checkout con PayPal (PayPal JS SDK) usando endpoints del backend (create-order / capture)
- (Opcional) Sección Admin dentro del mismo frontend o app separada

Este frontend **NO es la fuente de verdad** para precios/stock/totales: el backend recalcula y valida antes del pago.

---

## 1) Stack recomendado

- Next.js (App Router) + TypeScript
- UI: TailwindCSS + componentes (shadcn/ui o similar)
- Data fetching: TanStack Query (React Query) recomendado
- Estado UI: Zustand (opcional) para drawer/cart UI
- Pagos: PayPal JS SDK
- Auth: Google Identity Services (obtiene ID Token; backend verifica y crea sesión)

---

## 2) Estructura de carpetas (sugerida)

```txt
apps/web/
  app/
    page.tsx                 # Home
    products/
      page.tsx               # Listado
      [id]/
        page.tsx             # Detalle
    cart/
      page.tsx               # Carrito
    checkout/
      page.tsx               # Checkout (PayPal)
    login/
      page.tsx               # Login Google
    account/
      page.tsx               # Órdenes del usuario (opcional)
    admin/                   # (opcional) Admin dentro del mismo web
      products/page.tsx
      orders/page.tsx
      inventory/page.tsx

  components/
    ProductCard.tsx
    ProductFilters.tsx
    CartItemRow.tsx
    CartSummary.tsx
    PayPalButtonsWrapper.tsx
    GoogleLoginButton.tsx
    Navbar.tsx
    Footer.tsx

  lib/
    api/
      client.ts              # fetch wrapper (cookies, baseURL, error parsing)
      endpoints.ts
      auth.ts                # helpers para /auth/me, logout
      cart.ts
      products.ts
      checkout.ts
      orders.ts
    env.ts                   # lectura segura de env vars
    format/
      money.ts
    security/
      csrf.ts                # si aplica (cookies + CSRF)

  styles/
  public/
````

---

## 3) Variables de entorno

Crea `apps/web/.env.local` (NO lo subas al repo):

```txt
# API
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Google
NEXT_PUBLIC_GOOGLE_CLIENT_ID=xxxxxxxxxxxx.apps.googleusercontent.com

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=xxxxxxxxxxxxxxxx

# Optional: si tu backend requiere CSRF token header name
NEXT_PUBLIC_CSRF_HEADER_NAME=X-CSRF-Token
```

> En producción, estas variables se configuran desde el proveedor (ej. Vercel Environment Variables).

---

## 4) Reglas de seguridad y buenas prácticas (frontend)

### 4.1 No guardar tokens sensibles en localStorage

* El login con Google entrega un ID Token al frontend, pero:

  * el frontend lo envía al backend para iniciar sesión
  * el backend responde con **cookie httpOnly**
* Evita persistir tokens en localStorage por riesgo de XSS.

### 4.2 Consumir API con cookies (si backend usa sesión)

* Configurar `fetch`/client para enviar credenciales:

  * `credentials: "include"`

### 4.3 CSRF (si aplica)

Si backend exige CSRF para mutaciones (POST/PATCH/DELETE):

* Leer token CSRF (si el backend lo expone como cookie no-httpOnly o endpoint)
* Mandarlo en header en cada mutación, p.ej. `X-CSRF-Token`

### 4.4 CSP y dependencias

* Mantener dependencias actualizadas
* Evitar inyectar HTML sin sanitización (no `dangerouslySetInnerHTML` sin razón)

---

## 5) Integración con la API (contrato)

### 5.1 Convención de respuestas

La API responde en formato:

```json
{
  "success": true,
  "data": {},
  "error": null,
  "requestId": "..."
}
```

Errores:

```json
{
  "success": false,
  "data": null,
  "error": { "code": "SOME_CODE", "message": "Human-readable message" },
  "requestId": "..."
}
```

El frontend debe:

* Mostrar mensajes amigables
* Registrar `requestId` (útil para soporte/debug)

---

## 6) Flujos funcionales

### 6.1 Catálogo

* Listado:

  * `GET /v1/products`
* Detalle:

  * `GET /v1/products/:id`

**UI mínima recomendada**

* Búsqueda (q)
* Filtros (brand, precio)
* Orden (price asc/desc, newest)

---

### 6.2 Carrito

* Obtener carrito:

  * `GET /v1/cart`
* Agregar:

  * `POST /v1/cart/items` `{ productId, quantity }`
* Actualizar:

  * `PATCH /v1/cart/items/:itemId` `{ quantity }`
* Eliminar:

  * `DELETE /v1/cart/items/:itemId`

**Regla importante**

* El frontend puede mostrar subtotal estimado, pero el total real lo define el backend al crear la orden PayPal.

---

### 6.3 Login con Google (OIDC)

**Objetivo:** conseguir sesión en backend.

1. Front obtiene `idToken` (Google Identity Services)
2. Envía al backend:

   * `POST /v1/auth/google` con `{ idToken }`
3. Backend:

   * verifica firma/claims
   * crea sesión y set-cookie
4. Front:

   * redirige (ej. a `/checkout` o `/account`)

Para conocer usuario y rol:

* `GET /v1/auth/me`

Logout:

* `POST /v1/auth/logout`

---

### 6.4 Checkout con PayPal (flujo recomendado)

Este frontend NO crea órdenes en PayPal directamente con montos “del cliente”.
Siempre:

* Backend crea la orden PayPal (con totales recalculados)
* Front solo ejecuta UI de aprobación

**Paso a paso**

1. Crear orden PayPal desde backend:

* `POST /v1/checkout/paypal/create-order`
* Backend devuelve `paypal_order_id`

2. Render PayPal Buttons:

* Cargar PayPal JS SDK con `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
* Al aprobar (onApprove), capturar con backend:

3. Capturar:

* `POST /v1/checkout/paypal/capture` `{ paypalOrderId }`

4. Confirmación:

* redirigir a “gracias”
* consultar orden:

  * `GET /v1/orders/:id` (si tienes internal order id) o endpoint equivalente

**Idempotencia (recomendado)**
Para create-order y capture, mandar header:

* `Idempotency-Key: <uuid>`

Así evitas doble cobro por reintentos.

---

## 7) Admin (opcional dentro del mismo web)

Si el admin vive en `apps/web`:

* Rutas `/admin/*` deben protegerse en UI:

  * si `me.role !== "admin"` → redirigir o mostrar 403 UI
* Todas las operaciones admin van al backend (RBAC real en API)

Endpoints típicos:

* `POST /v1/admin/products`
* `PATCH /v1/admin/products/:id`
* `POST /v1/admin/inventory/adjust`
* `GET /v1/admin/orders`

> Nota: La seguridad real está en el backend (RBAC). La UI solo mejora UX.

---

## 8) Cliente HTTP (recomendación)

Implementa un `apiClient` que:

* Use `baseURL` desde `NEXT_PUBLIC_API_BASE_URL`
* Envíe cookies:

  * `credentials: "include"`
* Agregue headers:

  * `Content-Type: application/json`
  * CSRF header si aplica
  * `Idempotency-Key` para checkout/capture
* Parse errores en formato estándar de la API

---

## 9) Despliegue (Vercel recomendado)

Checklist:

* Configurar `NEXT_PUBLIC_API_BASE_URL` con la URL real del backend
* Configurar `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
* Configurar `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
* Asegurar que el backend permita el origen del dominio Vercel en CORS
* Verificar que cookies funcionen en producción (SameSite/Secure)

---

## 10) Checklist “listo para producción” (web)

* [ ] No se guardan tokens sensibles en localStorage
* [ ] Se usa cookie httpOnly de backend para sesión (recomendado)
* [ ] `credentials: "include"` configurado en llamadas API (si aplica)
* [ ] CSRF implementado si backend lo requiere
* [ ] PayPal: create-order/capture siempre pasan por backend
* [ ] Manejo de reintentos con `Idempotency-Key`
* [ ] Manejo de errores consistente (muestra mensajes + requestId)
* [ ] Variables de entorno correctas en Vercel
* [ ] CORS backend configurado para dominio del frontend

---

```
::contentReference[oaicite:0]{index=0}
```
