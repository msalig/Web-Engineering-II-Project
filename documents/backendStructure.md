## Methoden:

createUser(displayName, mail, password): User, 4xx

createBlog(blog: BlogEntry (ohne UUID) ): 201, 4xx

createComment(blodID: Number, comment: Comment (ohne UUID)): 201, 4xx


getAllBlogsShort(): List<BlogEntryShort>

getBlogsByTags(tags: List<String>): List<BlogEntryShort>

getBlogsByCountry(countries: String): List<BlogEntryShort>

getBlogByID(uuid: Number): BlogEntry, 4xx

getBlogsByAuthor(authorID: Number): List<BlogEntryShort>


getAllAuthors(): List<Author>

getAuthorByID(uuid: Number): Author, 4xx

getAuthorByDisplayName(displayName: String): Author, 4xx

getCommentsByAuthor(authorID: Number): List<BlogEntry>


login(mail, password): User, 4xx

vielleicht: loggout ?


später:
- update (User(displayname,mail), Blog, Comment)
- delete (User, Blog, Comment)



## Schema:

User (
displayName: String,
mail: String,
uuid: Number
)

Author (
displayName: String,
uuid: Number
)

BlogEntryShort (
uuid: Number,
author: Author,
title: String,
location: Location,
text: String,
review: Number,
tags: List<String>
)

BlogEntry (
uuid: Number,
author: Author,
title: String,
location: Location,
text: String,
review: Number,
tags: List<String>
comments: List<Comment>
)

Location (
country: String,
place: String,
lat: Number,
long: Number
)

Comment (
uuid: Number,
author: Author,
title: String,
comment: String,
review: Number
)
