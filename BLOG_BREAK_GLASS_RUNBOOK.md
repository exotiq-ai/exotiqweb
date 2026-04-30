# Blog Break-Glass Runbook

Use break-glass mode only during incidents where normal auth flow is unavailable and editorial access is needed immediately.

## Controls
- `VITE_BLOG_BREAK_GLASS=true`
- `VITE_BLOG_BREAK_GLASS_TOKEN=<one-time-secret>`
- `VITE_BLOG_BREAK_GLASS_ALLOWLIST=email1@example.com,email2@example.com`
- `VITE_BLOG_BREAK_GLASS_EXPIRES_AT=2026-03-01T00:00:00.000Z`

Break-glass is active only when enabled and not expired.

## Activation
1. Set the env variables above in deployment environment.
2. Share token only with on-call operator.
3. Access guarded route with `?bg=<token>` or use allowlisted email.
4. Confirm warning banner appears on admin pages.

## Required monitoring
- Capture analytics event `blog_break_glass_access`.
- Log incident ID and operator identity in incident notes.

## Deactivation
1. Set `VITE_BLOG_BREAK_GLASS=false`.
2. Clear token, allowlist, and expiration env vars.
3. Redeploy and verify banner is gone.
4. Review audit trail for any status transitions during incident window.
