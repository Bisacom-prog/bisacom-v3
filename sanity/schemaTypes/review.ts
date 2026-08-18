import {defineField, defineType} from "sanity";

export const review = defineType({
  name: "review",
  title: "Client Review",
  type: "document",
  fields: [
    defineField({name:"name",title:"Client name",type:"string",validation:Rule=>Rule.required()}),
    defineField({name:"email",title:"Email (private)",type:"email",validation:Rule=>Rule.required()}),
    defineField({name:"company",title:"Company",type:"string"}),
    defineField({name:"role",title:"Role",type:"string"}),
    defineField({name:"rating",title:"Star rating",type:"number",validation:Rule=>Rule.required().integer().min(1).max(5)}),
    defineField({name:"review",title:"Review",type:"text",rows:5,validation:Rule=>Rule.required().min(20).max(800)}),
    defineField({name:"approved",title:"Approved for website",type:"boolean",initialValue:false,description:"Only approved reviews are displayed publicly."}),
  ],
  preview:{select:{title:"name",subtitle:"company"}},
});
