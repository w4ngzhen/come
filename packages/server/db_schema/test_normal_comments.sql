-- 插入测试数据
INSERT INTO tb_comments (site_key, page_key, user_nickname, user_email_id, user_email, content, submit_time, status, related_comment_uid) VALUES
-- 1小时前的评论
('test1', 'test1', '张三', '5f4dcc3b5aa765d61d8327deb882cf99', 'z***g@example.com', '这个产品非常好用，功能齐全，界面简洁大方。特别是新增的数据分析功能，帮助我快速了解用户行为，做出更明智的决策。唯一的小缺点是加载速度有时会慢一点，希望后续版本能优化。总体来说非常满意，强烈推荐给需要类似工具的朋友！', strftime('%s', 'now', '-1 hours'), 1, NULL),
('test1', 'test1', '李四', '912ec803b2ce49e4a541068d495ab570', 'l***i@example.com', '不错', strftime('%s', 'now', '-50 minutes'), 1, NULL),
('test1', 'test1', '王五', '1a1dc91c907325c69271ddf0c944bc728', 'w***u@example.com', '使用体验很好，客服响应也很快，解决问题很及时。', strftime('%s', 'now', '-40 minutes'), 1, NULL),
('test1', 'test1', '赵六', 'd8578edf8458ce06fbc5611b8f8d327e', 'z***u@example.com', '整体满意，期待更多新功能！', strftime('%s', 'now', '-30 minutes'), 1, NULL),
('test1', 'test1', '钱七', '86f7e437faa5a7fce15d1ddcb9eaeaea3', 'q***i@example.com', '界面美观，操作简单，很容易上手。对于新手用户非常友好，不需要太多学习成本就能熟练使用。功能方面也比较全面，基本满足日常需求。', strftime('%s', 'now', '-20 minutes'), 1, NULL),
('test1', 'test1', '孙八', 'e9d71f5ee7c92d6dc9e92ffdad17b8bd4', 's***a@example.com', '很好用', strftime('%s', 'now', '-10 minutes'), 1, NULL),

-- 1天前的评论
('test1', 'test1', '周九', 'a87ff679a2f3e71d9181a67b7542122c7', 'z***u@example.com', '这是一个非常详细的长评论示例，用来测试系统对长文本内容的处理能力。在实际应用中，用户可能会输入各种长度的评论内容，短则几个字，长则几百字甚至更多。这个评论就属于较长的那种，大概有三百到四百字左右。通过这样的测试数据，可以验证系统在存储、显示和处理不同长度文本时的表现是否正常。同时，这也能帮助开发人员发现潜在的问题，比如文本截断、排版错乱等。希望这个测试评论能够满足需求，为系统测试提供有效的数据支持。', strftime('%s', 'now', '-1 days'), 1, NULL),
('test1', 'test1', '吴十', '4a8a08f09d37b73795649038408b5f33b', 'w***i@example.com', '产品功能很强大，使用起来也很流畅，没有卡顿现象。', strftime('%s', 'now', '-1 days', '+2 hours'), 1, NULL),
('test1', 'test1', '郑十一', 'c3fcd3d76192e4007dfb496cca67e13b6', 'z***i@example.com', '不错的产品', strftime('%s', 'now', '-1 days', '+4 hours'), 1, NULL),
('test1', 'test1', '王十二', '3dd81cbb348880a65585667897185d98', 'w***r@example.com', '用了一段时间，感觉很稳定，没有出现过崩溃或异常情况。功能也比较实用，能够满足我的日常需求。希望开发团队能够继续保持更新，推出更多有用的功能。', strftime('%s', 'now', '-1 days', '+6 hours'), 1, NULL),
('test1', 'test1', '冯十三', '8277e0910d750195b448797616e091ad3', 'f***g@example.com', '很好', strftime('%s', 'now', '-1 days', '+8 hours'), 1, NULL),
('test1', 'test1', '陈十四', '0d61f8370cad1d412f80b84d143e1257b', 'c***n@example.com', '这个产品真的很棒，解决了我长期以来的一个痛点问题。以前总是需要用多个工具才能完成的工作，现在用这一个产品就可以搞定了，大大提高了我的工作效率。界面设计也很人性化，操作起来非常直观。', strftime('%s', 'now', '-1 days', '+10 hours'), 1, NULL),

-- 2-7天前的评论
('test1', 'test1', '褚十五', '289dff07669d7a23de0ef88d2f7129e79', 'c***u@example.com', '还行', strftime('%s', 'now', '-2 days'), 1, NULL),
('test1', 'test1', '卫十六', '7e240de74fb1ed08fa08d38063f6a6a9', 'w***i@example.com', '产品整体表现不错，但还有一些可以改进的地方。希望开发团队能够重视用户反馈，不断优化产品体验。', strftime('%s', 'now', '-3 days'), 1, NULL),
('test1', 'test1', '蒋十七', 'e80b5017098950fc58aad83c8c14978e', 'j***g@example.com', '支持', strftime('%s', 'now', '-4 days'), 1, NULL),
('test1', 'test1', '沈十八', '86f7e437faa5a7fce15d1ddcb9eaeaea3', 's***n@example.com', '这是一个中等长度的评论，用来测试系统对不同长度文本的处理能力。在实际应用中，用户可能会输入各种长度的评论内容，这个评论就属于中等长度的那种。', strftime('%s', 'now', '-5 days'), 1, NULL),
('test1', 'test1', '韩十九', 'a1d48930852647296b819f100d3b1a0c8', 'h***n@example.com', '很好用的产品', strftime('%s', 'now', '-6 days'), 1, NULL),
('test1', 'test1', '杨二十', '4b98b6375895a6f78c8f78f78f78f78f7', 'y***g@example.com', '使用过程中遇到了一些小问题，联系客服后很快就得到了解决，服务态度很好。产品本身也很不错，功能齐全，操作简单。', strftime('%s', 'now', '-7 days'), 1, NULL),
('test1', 'test1', '朱二十一', 'd93591bdf7860e1e4ee2fca799911215', 'z***u@example.com', '推荐', strftime('%s', 'now', '-8 days'), 1, NULL),
('test1', 'test1', '秦二十二', 'd93591bdf7860e1e4ee2fca799911215', 'q***n@example.com', '这是一个非常长的评论内容示例，用于测试系统对大段文本的处理能力。在实际应用场景中，用户可能会发表各种长度的评论，从简短的几个字到数百字不等。这个评论就属于较长的类型，包含了大约三百到四百个汉字。通过这样的测试数据，可以验证系统在存储、传输和显示长文本内容时的性能和稳定性。同时，这也有助于开发人员发现潜在的问题，如文本截断、格式错误等。希望这个测试评论能够满足需求，为系统测试提供有效的数据支持。', strftime('%s', 'now', '-9 days'), 1, NULL);