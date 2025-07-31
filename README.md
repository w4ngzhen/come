# COME

> [!WARNING]
> This project is still in heavy development and testing.
> Everything you see is very much a work-in-progress.

COME，一套轻量级，可自托管的，基于Cloudflare D1的评论管理方案

COME, a lightweight, self-hosted Cloudflare D1-based comment management solution

- 自托管
- 足够轻量

对于“自托管”来说，本系统主要借助Cloudflare提供的能力/服务，通过免费（一定额度）的 Worker 来承载评论系统的后台服务接口逻辑，通过 Cloudflare D1 轻量级数据库来存储所有的评论数据。

对于“足够轻量”来说，笔者在设计本系统时，整个系统只考虑使用了**一张**数据库表来存储站点评论数据，不引入其他额外的复杂功能来增加本系统复杂度，我相信任何感兴趣的朋友可以快速理解本系统，并搭建一套属于自己的评论系统。

- self-hosted
- lightweight enough

For "self-hosted", this system mainly relies on the capabilities/services provided by Cloudflare, carries the background service interface logic of the comment system through free (a certain amount) Workers, and stores all comment data through Cloudflare D1 lightweight database.

For "lightweight enough", the author in the design of the system, the whole system only considered the use of **ONE** database table to store site comment data, NO additional heavyweight functionality is introduced to increase the complexity of the system, I believe that any interested friends can quickly understand the system, and build a set of their own comments system.

COME使用pnpm monorepo方式组织管理项目代码。该仓库下主要包含以下几个模块：

1. 公共类型定义（@come/common-types）。该模块仅提供TypeScript类型定义，方便后台服务、前端页面组件共享类型定义。
2. 评论系统接口服务（@come/server）。基于Cloudflare Woker的node服务，使用TypeScript开发，整个服务目前只有3个依赖库：
    - Hono：与Cloudflare深度集成的超轻量级 Web 框架。高性能，零依赖。
    - drizzle-orm：Cloudflare 生态中用于类型安全数据库操作的轻量级 TypeScript ORM 库，尤其与 Cloudflare  D1（边缘 SQLite 数据库）深度集成
    - zod：一个高性能，轻量级的校验库。可以方便定义一些数据的字段校验规则。
3. 后台服务管理WebUI（@come/web-server-management）。后台服务的Web页面，核心使用React+antd@5开发。通过该Web系统，可以方便的管理站点系统的所有评论留言。
4. 客户端评论UI组件 ComeCommentBox（@come/come-comment-box）。TypeScript + preact 进行开发，只依赖preact。

COME uses pnpm monorepo to organize and manage project code. The warehouse mainly contains the following modules:

1. Common type definitions (@come/common-types). This module only provides TypeScript type definition, which is convenient for background services and front-end page components to share type definition.
2. Comment on System Interface Services (@come/server). Cloudflare Woker-based node service, developed using TypeScript, the entire service currently has only three dependencies:
    - Hono: An ultra-lightweight Web framework deeply integrated with Cloudflare. High performance, zero dependency.
    - drizzle-orm: Lightweight TypeScript ORM library for type-safe database operations in Cloudflare ecosystem, especially deep integration with Cloudflare D1 (edge SQLite database)
    - Zod: a high-performance, lightweight validator. It is convenient to define some data field verification rules.
3. Back-office service management WebUI (@come/web-server-management). Web pages for background services, core developed using React+antd@5. Through the Web system, you can easily manage all comments of the site system.
4. Client comment UI component ComeCommentBox (@come/come-comment-box). TypeScript + preact for development, relying only on preact.