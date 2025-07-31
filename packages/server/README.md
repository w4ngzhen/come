# @come/server

评论系统接口服务（packages/server）。基于Cloudflare Worker的node服务，使用TypeScript开发，整个服务目前只有3个依赖库：

- Hono：与Cloudflare深度集成的超轻量级 Web 框架。高性能，零依赖。
- drizzle-orm：Cloudflare 生态中用于类型安全数据库操作的轻量级 TypeScript ORM 库，尤其与 Cloudflare D1（边缘 SQLite 数据库）深度集成
- zod：一个高性能，轻量级的校验库。可以方便定义一些数据的字段校验规则。

Comments System Interface Services (packages/servers). Cloudflare Worker based node service, developed using TypeScript, the entire service currently has only three dependencies:

- Hono: An ultra-lightweight Web framework deeply integrated with Cloudflare. High performance, zero dependency.
- drizzle-orm: Lightweight TypeScript ORM library for type-safe database operations in Cloudflare ecosystem, especially deep integration with Cloudflare D1 (edge SQLite database)
- Zod: a high-performance, lightweight validator. It is convenient to define some data field verification rules.