 import {ILocation} from "./Iocation";
 import {IUser} from "./user";
 import {IComment} from "./comment";

export interface IBlogEntry{
  displayname:string;
  author: IUser;
  title: string;
  location:ILocation;
  blogentryShort:string;
  blogentry: string;
  comments: IComment[];
  tags: string[];
  review:number;



}



 // {
 //   "author": {
 //   "displayname": "Max Mustermann",
 //     "name": "max_muster",
 //     "mail": "max.mustermann@email.com"
 // },
 //   "blogentry": "Sinsheim: Eine Reise in die Geschichte und Kultur",
 //   "blogentryShort": "Entdecken Sie die faszinierende Stadt Sinsheim",
 //   "comments": [
 //   {
 //     "commentid": 1,
 //     "author": {
 //       "displayname": "Lisa Muster",
 //       "name": "lisa_m",
 //       "mail": "lisa.muster@email.com"
 //     },
 //     "review":3,
 //     "title": "Toller Beitrag!",
 //     "comment": "Ich war auch schon in Sinsheim und es ist wirklich eine beeindruckende Stadt."
 //   },
 // ],
 //   "location": {
 //   "country": "Deutschland",
 //     "place": "Sinsheim",
 //     "coordinates": {
 //     "x": 49.237193,
 //       "y": 8.895124
 //   }
 // },
 //   "tags": ["Sinsheim", "Reise", "Kultur"],
 //   "title": "Entdecken Sie Sinsheim: Geschichte, Kultur und mehr",
 //   "review":3,
 //   displayname:"entedecken-sie-sinsheim"
 // }
