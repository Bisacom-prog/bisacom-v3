import {defineArrayMember, defineField, defineType} from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    {name: "content", title: "Content", default: true},
    {name: "seo", title: "SEO"},
  ],
  fields: [
    defineField({name:"title",title:"Title",type:"string",group:"content",validation:(Rule)=>Rule.required().max(80)}),
    defineField({name:"slug",title:"Slug",type:"slug",group:"content",options:{source:"title",maxLength:96},validation:(Rule)=>Rule.required()}),
    defineField({name:"excerpt",title:"Excerpt",type:"text",rows:3,group:"content",description:"Short summary used on the blog index and in social previews.",validation:(Rule)=>Rule.required().max(220)}),
    defineField({name:"category",title:"Category",type:"string",group:"content",options:{list:[
      {title:"Product Design",value:"Product Design"},
      {title:"UX for Business",value:"UX for Business"},
      {title:"SaaS Design",value:"SaaS Design"},
      {title:"Design Systems",value:"Design Systems"},
      {title:"Career",value:"Career"}
    ]},validation:(Rule)=>Rule.required()}),
    defineField({name:"publishedAt",title:"Published At",type:"datetime",group:"content",initialValue:()=>new Date().toISOString(),validation:(Rule)=>Rule.required()}),
    defineField({name:"readTime",title:"Read Time",type:"string",group:"content",description:'Example: "6 min read".'}),
    defineField({name:"featuredImage",title:"Featured Image",type:"image",group:"content",options:{hotspot:true},fields:[
      defineField({name:"alt",title:"Alternative Text",type:"string",validation:(Rule)=>Rule.required()})
    ]}),
    defineField({name:"body",title:"Article",type:"array",group:"content",of:[
      defineArrayMember({type:"block",styles:[
        {title:"Normal",value:"normal"},{title:"Heading 2",value:"h2"},{title:"Heading 3",value:"h3"},{title:"Quote",value:"blockquote"}
      ],lists:[{title:"Bullet",value:"bullet"},{title:"Numbered",value:"number"}]}),
      defineArrayMember({type:"image",options:{hotspot:true},fields:[
        defineField({name:"alt",title:"Alternative Text",type:"string",validation:(Rule)=>Rule.required()}),
        defineField({name:"caption",title:"Caption",type:"string"})
      ]})
    ],validation:(Rule)=>Rule.required()}),
    defineField({name:"seoTitle",title:"SEO Title",type:"string",group:"seo",description:"Aim for approximately 50–60 characters.",validation:(Rule)=>Rule.max(70)}),
    defineField({name:"seoDescription",title:"SEO Description",type:"text",rows:3,group:"seo",description:"Aim for approximately 140–160 characters.",validation:(Rule)=>Rule.max(180)}),
    defineField({name:"primaryKeyword",title:"Primary Keyword",type:"string",group:"seo"}),
    defineField({name:"seoKeywords",title:"Supporting Keywords",type:"array",group:"seo",of:[{type:"string"}],options:{layout:"tags"}}),
    defineField({name:"seoNoIndex",title:"Hide from search engines",type:"boolean",group:"seo",initialValue:false,description:"Enable only for drafts or pages that should not appear in search."})
  ],
  orderings:[{title:"Published, newest first",name:"publishedDesc",by:[{field:"publishedAt",direction:"desc"}]}],
  preview:{select:{title:"title",subtitle:"category",media:"featuredImage"}}
});
