import {groq} from "next-sanity";
export const projectBySlugQuery=groq`*[_type=="project"&&slug.current==$slug][0]{
title,category,projectType,summary,heroImage,role,timeline,tools,platform,
problem,goal,designChallenge,targetUsers,researchMethods,researchInsights[]{title,description},
personas[]{image,alt,caption,displaySize},journeyMaps[]{image,alt,caption,displaySize},
userFlows[]{image,alt,caption,displaySize},wireframes[]{image,alt,caption,displaySize},designSystem[]{image,alt,caption,displaySize},
solutionOverview,keyFeatures[]{title,description,icon},
finalUiSections[]{title,description,displayMode,screens[]{image,alt,caption,displaySize}},
edgeCaseIntro,edgeCases[]{title,scenario,challenge,solution,actions,screens[]{image,alt,caption,displaySize}},
prototypeUrl,"prototypeVideoUrl":prototypeVideo.asset->url,prototypePoster,prototypeNotes,
outcome,impactMetrics[]{metric,label,description},learnings,nextSteps,
contentSections[]{eyebrow,title,summary,layout,background,images[]{image,alt,caption,displaySize}},
liveUrl,figmaUrl,repositoryUrl,
personasImage,journeyMapImage,userFlowImage,wireframeImages,designSystemImage,
finalScreens[]{title,description,image},sections[]{number,title,description,image}
}`;