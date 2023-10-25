import {IBlogEntry} from "../interfaces/blogEntry";
import {ICoordinates} from "../interfaces/coordinates";

export function getBlogEntrys(): IBlogEntry[] {
  return [
    {
      "author": {
        "displayname": "Max Mustermann",
        "name": "max_muster",
        "mail": "max.mustermann@email.com",
        publishedblogs:4
      },
      "blogentry": "Sinsheim: Eine Reise in die Geschichte und Kultur",
      "blogentryShort": "Entdecken Sie die faszinierende Stadt Sinsheim",
      "comments": [
        {
          "commentid": 1,
          "author": {
            "displayname": "Lisa Muster",
            "name": "lisa_m",
            "mail": "lisa.muster@email.com",
            publishedblogs:4
          },
          "review":3,
          "title": "Toller Beitrag!",
          "comment": "Ich war auch schon in Sinsheim und es ist wirklich eine beeindruckende Stadt."
        },
      ],
      "location": {
        "country": "Deutschland",
        "place": "Sinsheim",
        "coordinates": {
          "x": 49.237193,
          "y": 8.895124
        }
      },
      "tags": ["Sinsheim", "Reise", "Kultur"],
      "title": "Entdecken Sie Sinsheim: Geschichte, Kultur und mehr",
      "review":3,
      displayname:"entedecken-sie-sinsheim"
    }
   , {
    "author": {
      "displayname": "Wilfred0018",
      "name": "Wilfred",
      "mail": "wilfred0018@example.com",
      publishedblogs:4
    },
    "blogentry": "Hallo aus Berlin! Diese aufregende Stadt hat so viel zu bieten, dass es schwer ist, alles in einem Blogbeitrag zu erfassen. Berlin, die Hauptstadt Deutschlands, ist eine Stadt voller Geschichte, Kultur und spannender Entdeckungen. Die pulsierende Atmosphäre und die beeindruckende Mischung aus Altem und Neuem machen Berlin zu einem einzigartigen Reiseziel. Von den Überresten der Berliner Mauer bis hin zu modernen Kunstgalerien und lebendigen Vierteln ist Berlin ein Schmelztiegel der Kulturen und Einflüsse.",
    "blogentryShort": "Berlin - Eine Stadt voller Geschichte und spannender Entdeckungen!",
      review:4,
      displayname:"asf",
    "comments": [{
      "author": {
        "displayname": "ReiseLiebhaber22",
        "name": "",
        "mail": "",
        publishedblogs:4
      },
      "title": "Faszinierende Stadt!",
      "comment": "Berlin ist wirklich eine faszinierende Stadt! Deine Beschreibung der engen Gassen und des beeindruckenden Doms hat mir das Verlangen geweckt, Berlin selbst zu besuchen. Die Mischung aus historischen Gebäuden und modernem Flair ist einzigartig. Ich freue mich schon darauf, die Stadt zu erkunden!",
      "review": 4,
      "commentid": 1
    },
      {
        "author": {
          "displayname": "KulturEntdeckerin",
          "name": "",
          "mail": "",
          publishedblogs:4
        },
        "title": "Kulturelle Schätze",
        "comment": "Vielen Dank für diesen informativen Beitrag! Berlin hat zweifellos eine reiche kulturelle Geschichte, und deine Erwähnung des Piazza del Campo und des beeindruckenden Doms hat mein Interesse geweckt. Ich plane schon meine eigene Reise, um die kulturellen Schätze der Stadt zu entdecken.",
        "review": 4,
        commentid: 3
      },
      {
        "author": {
          "displayname": "GenussSucher",
          "name": "",
          "mail": "",
          publishedblogs:4
        },
        "title": "Kulinarische Highlights",
        "comment": "Die kulinarischen Highlights in Berlin sind einfach unwiderstehlich! Deine Erwähnung von frischer Pasta und Chianti-Wein hat mir das Wasser im Mund zusammenlaufen lassen. Ich kann es kaum erwarten, die Berliner Küche selbst zu kosten und die gemütlichen Restaurants zu erkunden.",
        "review": 5,
        "commentid":2
      }],
    "location": {
      "country": "Deutschland",
      "place": "Berlin",
      "coordinates": {
        "x": 52.5200,
        "y": 13.4050
      }
    },
    "tags": ["Berlin", "Deutschland", "Stadt", "Kultur", "Geschichte"],
    "title": "Berlin - Eine Reise durch Geschichte und Moderne"
  },
    {
      "author": {
        "displayname": "TravelLover42",
        "name": "Sophia",
        "mail": "travellover42@example.com",
        publishedblogs:4
      },
      "blogentry": "Ciao aus Florenz! Diese atemberaubende Stadt in der Toskana ist eine wahre Perle Italiens. Florenz, auch bekannt als Firenze, ist berühmt für seine reiche Renaissance-Geschichte, beeindruckende Kunstwerke und exquisite Küche. In den letzten Tagen habe ich die Schätze dieser Stadt erkundet und mich in ihre zeitlose Schönheit verliebt. Die engen Gassen, historischen Gebäude und kunstvollen Kirchen haben mich in ihren Bann gezogen.",
      "blogentryShort": "Florenz - Eine Reise in die Renaissance",
      review:4,
      displayname:"asdfasd",
      "comments": [],
      "location": {
        "country": "Italien",
        "place": "Florenz",
        "coordinates": {
          "x": 43.7696,
          "y": 11.2558
        }
      },
      "tags": ["Florenz", "Italien", "Renaissance", "Kunst", "Küche"],
      "title": "Florenz - Eine Reise in die Renaissance"
    }, {
      "author": {
        "displayname": "TravelLover42",
        "name": "Sophia",
        "mail": "travellover42@example.com",
        publishedblogs:4
      },
      "blogentry": "Olá aus Lissabon! Diese bezaubernde Hauptstadt Portugals hat mein Herz im Sturm erobert. Lissabon ist eine Stadt, die Geschichten aus Jahrhunderten erzählt und dennoch modern und lebendig ist. In den letzten Tagen habe ich die engen Gassen, die lebendige Kultur und die traumhaften Aussichten auf den Tejo-Fluss erkundet. Die Kombination aus historischem Charme und zeitgenössischem Flair macht Lissabon zu einem wirklich einzigartigen Reiseziel.",
      "blogentryShort": "Lissabon - Die Stadt der sieben Hügel und unendlichen Entdeckungen",
      review:4,
      displayname:"asfasddddd",
      "comments": [],
      "location": {
        "country": "Portugal",
        "place": "Lissabon",
        "coordinates": {
          "x": 38.7223,
          "y": -9.1393
        }
      },
      "tags": ["Lissabon", "Portugal", "Kultur", "Geschichte", "Tejo-Fluss"],
      "title": "Lissabon - Die Stadt der sieben Hügel und unendlichen Entdeckungen"
    }, {
      "author": {
        "displayname": "Explorer87",
        "name": "Alex",
        "mail": "explorer87@example.com",
        publishedblogs:4
      },
      "blogentry": "Sveiki no Rīgas! Riga, die Hauptstadt Lettlands, hat mich mit ihrer einzigartigen Mischung aus Geschichte und Moderne in ihren Bann gezogen. Die Altstadt von Riga, ein UNESCO-Weltkulturerbe, ist ein wahres Juwel mit ihren gut erhaltenen mittelalterlichen Gebäuden und charmanten Gassen. Aber auch das moderne Riga hat einiges zu bieten, von trendigen Cafés bis hin zu faszinierenden Kunstgalerien. Die Stadt hat definitiv meinen Entdeckergeist geweckt.",
      "blogentryShort": "Riga - Entdecke den Zauber der Baltischen Metropole",
      review:4,
      displayname:"aseeef",
      "comments": [],
      "location": {
        "country": "Lettland",
        "place": "Riga",
        "coordinates": {
          "x": 56.9496,
          "y": 24.1052
        }
      },
      "tags": ["Riga", "Lettland", "Geschichte", "Moderne", "Baltikum"],
      "title": "Riga - Entdecke den Zauber der Baltischen Metropole"
    }, {
      "author": {
        "displayname": "WanderlustDreamer",
        "name": "Emily",
        "mail": "wanderlustdreamer@example.com",
        publishedblogs:4
      },
      "blogentry": "Ciao from Venice! Venice, the city of canals, is a place like no other. It's a dream come true for any wanderlust-driven soul. Over the past week, I've been getting lost in the maze of narrow alleys, admiring the intricate architecture, and gliding through the picturesque canals on gondolas. Venice's unique charm and romantic atmosphere make it an enchanting destination that's impossible to forget.",
      "blogentryShort": "Venice - Where Dreams Float on Canals",
      review:4,
      displayname:"asf3232",
      "comments": [],
      "location": {
        "country": "Italy",
        "place": "Venice",
        "coordinates": {
          "x": 45.4408,
          "y": 12.3155
        }
      },
      "tags": ["Venice", "Italy", "Canals", "Romance", "Wanderlust"],
      "title": "Venice - Where Dreams Float on Canals"
    },
    {
      "author": {
        "displayname": "WanderlustDreamer",
        "name": "Emily",
        "mail": "wanderlustdreamer@example.com",
        publishedblogs:4
      },
      "blogentry": "Ciao from Venice! Venice, the city of canals, is a place like no other. It's a dream come true for any wanderlust-driven soul. Over the past week, I've been getting lost in the maze of narrow alleys, admiring the intricate architecture, and gliding through the picturesque canals on gondolas. Venice's unique charm and romantic atmosphere make it an enchanting destination that's impossible to forget.",
      "blogentryShort": "Venice - Where Dreams Float on Canals",
      review:4,
      displayname:"asfkjuhyg",
      "comments": [],
      "location": {
        "country": "Italy",
        "place": "Venice",
        "coordinates": {
          "x": 45.4408,
          "y": 12.3155
        }
      },
      "tags": ["Venice", "Italy", "Canals", "Romance", "Wanderlust"],
      "title": "Venice - Where Dreams Float on Canals"
    }, {
      "author": {
        "displayname": "WanderlustDreamer",
        "name": "Emily",
        "mail": "wanderlustdreamer@example.com",
        publishedblogs:4
      },
      "blogentry": "Cześć from Wrocław! Wrocław, the charming city in Poland, has stolen my heart with its unique blend of history and modernity. The Market Square, with its colorful buildings and lively atmosphere, is a true gem. The city's many bridges and islands connected by the Oder River add to its distinctive character. Exploring the historic Old Town and discovering hidden courtyards has been a delightful adventure. Wrocław is a city that celebrates its rich history while embracing a vibrant present.",
      "blogentryShort": "Wrocław - Where History and Modernity Dance Together",
      review:4,
      displayname:"asfadfdas",
      "comments": [],
      "location": {
        "country": "Poland",
        "place": "Wrocław",
        "coordinates": {
          "x": 51.1079,
          "y": 17.0385
        }
      },
      "tags": ["Wrocław", "Poland", "History", "Old Town", "Oder River"],
      "title": "Wrocław - Where History and Modernity Dance Together"
    },
    {
      "author": {
        "displayname": "WanderlustDreamer",
        "name": "Emily",
        "mail": "wanderlustdreamer@example.com",
        publishedblogs:4
      },
      "blogentry": "Ciao from Rome! Rome, the Eternal City, is a place where history comes to life. The Colosseum, the Vatican, and the ancient ruins are like a journey through time. And of course, you can't forget the delicious Italian cuisine that satisfies the soul. The cobbled streets and charming piazzas make every corner a picturesque postcard. Rome is a city that enchants you with its rich past and captivating present.",
      "blogentryShort": "Rome - Where History Beckons at Every Turn",
      review:4,
      displayname:"asfuiop",
      "comments": [],
      "location": {
        "country": "Italy",
        "place": "Rome",
        "coordinates": {
          "x": 41.9028,
          "y": 12.4964
        }
      },
      "tags": ["Rome", "Italy", "History", "Cuisine", "Vatican"],
      "title": "Rome - Where History Beckons at Every Turn"
    },
    {
      "author": {
        "displayname": "WanderlustDreamer",
        "name": "Emily",
        "mail": "wanderlustdreamer@example.com",
        publishedblogs:4
      },
      "blogentry": "Hello from the Scottish Dream Islands! The rugged landscapes, castles, and mystical ambiance of these islands have left me in awe. From the Isle of Skye's dramatic cliffs to the historic charm of the Orkney Islands, each destination offers something truly unique. It's a paradise for nature lovers and history enthusiasts alike. The welcoming locals and traditional Scottish fare make the journey even more enchanting.",
      "blogentryShort": "Scottish Dream Islands - Where Nature Meets History",
      review:4,
      displayname:"aseeeehf",
      "comments": [],
      "location": {
        "country": "Scotland",
        "place": "Scottish Dream Islands",
        "coordinates": {
          "x": 57.2744,
          "y": -4.4215
        }
      },
      "tags": ["Scottish Islands", "Scotland", "Nature", "History", "Castles"],
      "title": "Scottish Dream Islands - Where Nature Meets History"
    },
    {
      "author": {
        "displayname": "WanderlustDreamer",
        "name": "Emily",
        "mail": "wanderlustdreamer@example.com",
        publishedblogs:4
      },
      "blogentry": "Hola from Barcelona! Barcelona, the vibrant city on the Mediterranean, is a treasure trove of culture and architecture. From the iconic Sagrada Familia to the lively La Rambla, every corner of this city is a work of art. The tapas, the beaches, and the Gaudi-inspired wonders are a feast for the senses. Barcelona is a city that celebrates life with its exuberant spirit and warm hospitality.",
      "blogentryShort": "Barcelona - Where Art and Culture Collide",
      review:4,
      displayname:"asdddddf",
      "comments": [],
      "location": {
        "country": "Spain",
        "place": "Barcelona",
        "coordinates": {
          "x": 41.3851,
          "y": 2.1734
        }
      },
      "tags": ["Barcelona", "Spain", "Culture", "Art", "Gaudi"],
      "title": "Barcelona - Where Art and Culture Collide"
    }
  ]
}





export function getBlogEntrysByAuthor(authorIdentifier:string):IBlogEntry[]{
 return [{
   "author": {
     "displayname": "Wilfred0018",
     "name": "Wilfred",
     "mail": "wilfred0018@example.com",
     publishedblogs:4
   },
   "blogentry": "Hallo aus Berlin! Diese aufregende Stadt hat so viel zu bieten, dass es schwer ist, alles in einem Blogbeitrag zu erfassen. Berlin, die Hauptstadt Deutschlands, ist eine Stadt voller Geschichte, Kultur und spannender Entdeckungen. Die pulsierende Atmosphäre und die beeindruckende Mischung aus Altem und Neuem machen Berlin zu einem einzigartigen Reiseziel. Von den Überresten der Berliner Mauer bis hin zu modernen Kunstgalerien und lebendigen Vierteln ist Berlin ein Schmelztiegel der Kulturen und Einflüsse.",
   "blogentryShort": "Berlin - Eine Stadt voller Geschichte und spannender Entdeckungen!",
   review:4,
   displayname:"asf",
   "comments": [{
     "author": {
       "displayname": "ReiseLiebhaber22",
       "name": "",
       "mail": "",
       publishedblogs:4
     },
     "title": "Faszinierende Stadt!",
     "comment": "Berlin ist wirklich eine faszinierende Stadt! Deine Beschreibung der engen Gassen und des beeindruckenden Doms hat mir das Verlangen geweckt, Berlin selbst zu besuchen. Die Mischung aus historischen Gebäuden und modernem Flair ist einzigartig. Ich freue mich schon darauf, die Stadt zu erkunden!",
     "review": 4,
     "commentid": 1
   },
     {
       "author": {
         "displayname": "KulturEntdeckerin",
         "name": "",
         "mail": "",
         publishedblogs:4
       },
       "title": "Kulturelle Schätze",
       "comment": "Vielen Dank für diesen informativen Beitrag! Berlin hat zweifellos eine reiche kulturelle Geschichte, und deine Erwähnung des Piazza del Campo und des beeindruckenden Doms hat mein Interesse geweckt. Ich plane schon meine eigene Reise, um die kulturellen Schätze der Stadt zu entdecken.",
       "review": 4,
       commentid: 3
     },
     {
       "author": {
         "displayname": "GenussSucher",
         "name": "",
         "mail": "",
         publishedblogs:4
       },
       "title": "Kulinarische Highlights",
       "comment": "Die kulinarischen Highlights in Berlin sind einfach unwiderstehlich! Deine Erwähnung von frischer Pasta und Chianti-Wein hat mir das Wasser im Mund zusammenlaufen lassen. Ich kann es kaum erwarten, die Berliner Küche selbst zu kosten und die gemütlichen Restaurants zu erkunden.",
       "review": 5,
       "commentid":2
     }],
   "location": {
     "country": "Deutschland",
     "place": "Berlin",
     "coordinates": {
       "x": 52.5200,
       "y": 13.4050
     }
   },
   "tags": ["Berlin", "Deutschland", "Stadt", "Kultur", "Geschichte"],
   "title": "Berlin - Eine Reise durch Geschichte und Moderne"
 },
   {
     "author": {
       "displayname": "TravelLover42",
       "name": "Sophia",
       "mail": "travellover42@example.com",
       publishedblogs:4
     },
     "blogentry": "Ciao aus Florenz! Diese atemberaubende Stadt in der Toskana ist eine wahre Perle Italiens. Florenz, auch bekannt als Firenze, ist berühmt für seine reiche Renaissance-Geschichte, beeindruckende Kunstwerke und exquisite Küche. In den letzten Tagen habe ich die Schätze dieser Stadt erkundet und mich in ihre zeitlose Schönheit verliebt. Die engen Gassen, historischen Gebäude und kunstvollen Kirchen haben mich in ihren Bann gezogen.",
     "blogentryShort": "Florenz - Eine Reise in die Renaissance",
     review:4,
     displayname:"asdfasd",
     "comments": [],
     "location": {
       "country": "Italien",
       "place": "Florenz",
       "coordinates": {
         "x": 43.7696,
         "y": 11.2558
       }
     },
     "tags": ["Florenz", "Italien", "Renaissance", "Kunst", "Küche"],
     "title": "Florenz - Eine Reise in die Renaissance"
   }];
}













//
// //
// {
//   author: {
//     displayname:"",
//       name:"",
//       mail:""
//   },
//   blogentry: "",
//     blogentryShort: "",
//   comments: ["comments": [{
//   author:{
//     "displayName": "",
//     "name": "",
//     "mail": ""
//   },
//   title:"",
//   comment:"",
//   review:2.5
// }],],
//   location: {
//   country: "",
//     place: "",
//     coordinates: {
//   x:0,
//   y:0
// },
// },
// tags: [],
// title: ""
// }
//
//
// //
// "comments": [{
//   author:{
//     "displayName": "",
//     "name": "",
//     "mail": ""
//   },
//   title:"",
//   comment:"",
//   review:2.5
// }],
