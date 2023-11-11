const swaggerOptions = {
  definition: {
    openapi: '3.0.0', info: {
      title: 'Web Engineering II Project API', description: "Add description", version: '1.0.0',
    }, servers: [{
      url: "http://localhost:3000/api", description: "Main (production) server"
    }, {
      url: "http://localhost:3000/v2/api", description: "Internal staging server for testing"
    }], components: {
      schemas: {
        BlogEntry: {
          type: "object", properties: {
            authorId: {
              type: "string", description: "The ID of the author of the blog entry"
            }, title: {
              type: "string", description: "The title of the blog entry"
            }, url: {
              type: "string", description: "The unique url of the blog entry"
            }, locationId: {
              type: "string", description: "The ID of the location associated with the blog entry"
            }, text: {
              type: "string", description: "The main text content of the blog entry"
            }, textShort: {
              type: "string", description: "A short preview of the text content of the blog entry"
            }, review: {
              type: "integer", description: "The review rating for the blog entry"
            }, tags: {
              type: "array", items: {
                type: "string", description: "An array of tags associated with the blog entry"
              }
            }, comments: {
              type: "array", items: {
                type: "string", description: "An array of comment IDs associated with the blog entry"
              }
            }
          }
        }, Location: {
          type: "object", properties: {
            country: {
              type: "string", description: "The country of the location"
            }, place: {
              type: "string", description: "The name of the place"
            }, lat: {
              type: "number", description: "The latitude coordinate of the location"
            }, lon: {
              type: "number", description: "The longitude coordinate of the location"
            }
          }
        }, Comment: {
          type: "object", properties: {
            authorId: {
              type: "string", description: "The ID of the author of the comment"
            },
            blogEntryId: {
              type: "string", description: "The ID of the blogEntry this comment belongs to"
            }, title: {
              type: "string", description: "The title of the comment"
            }, text: {
              type: "string", description: "The text content of the comment"
            }, review: {
              type: "number", description: "The review rating for the comment"
            }
          }
        }, User: {
          type: "object", properties: {
            displayname: {
              type: "string", description: "The full name of the user"
            }, username: {
              type: "string", description: "The username of the user"
            }, email: {
              type: "string", description: "The email address of the user"
            }, password: {
              type: "string", description: "The hashed password of the user"
            }
          }
        }
      }
    }
  }, apis: ['./server/routes/*.js'], // files containing annotations as above
}

module.exports = swaggerOptions;
