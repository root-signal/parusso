---
title: "Operationalized continuous discovery"
subtitle: "Ad Hoc | Department of Veterans Affairs"
layout: "project"
summary: "I developed a process for analyzing user feedback that helped our stakeholders identify high value features, helped the team catch and fix production bugs that were directly affecting users, and gave the team a way to track the success of releases."
previewImage: 
  src: "img/tracked-feedback.png"
  altText: "You can add alt text to your preview image here" 
  caption: "You can add a caption to your preview image here, or you can delete this and have no caption."
slug: "operationalized-continuous-delivery"
weight: 10 # Use this to set the order it appears in the projects list
# Description and images are for search results, social media posts, etc
description: "TBD"
images: ["https://via.placeholder.com/250x200/d9d9d9/000000"]

---

{{< intro >}}
I developed a process for analyzing user feedback that helped our stakeholders identify high value features, helped the team catch and fix production bugs that were directly affecting users, and gave the team a way to track the success of releases.
{{< /intro >}}

### Background

Every day we would receive 50-100 comments about the appointments tool through an anonymous feedback form and an intercept survey. We needed a process to understand what the recurring themes were, and whether we were really mitigating issues over time.

### My work
I created a method to analyze feedback for themes, sentiment, and feature requests:

- I captured all the feedback in Excel, as all data needed to remain on the VA network to avoid exposing PHI/PII, and getting buy-in on using new tools was a challenge.
- I coded the feedback for themes, feature requests, bugs, and outages.
- I integrated the feedback with user behavior data from Google Analytics and Datadog to capture as much context as possible during major releases, I monitored feedback daily. If issues started emerging, we could pull the feature quickly.
- I reported on the themes from feedback to the team weekly, and to our stakeholders monthly.

I refined this process over the course of a year to develop a shared understanding of the most common recurring pain points, feature requests, and positive themes.

![TBD - This is alt text on an image, please remember to set it](/img/tracked-feedback.png)

### Outcome

This tool made life easier for the team in a few ways.

- It gained immediate use as a lagging indicator of errors. When users ran into issues I could immediately see what was a trend vs. an individual problem, and file a bug for the team to investigate.
- It helped us understand which features would have the most impact. Rescheduling and better data around appointments came up regularly as top requests.
- As the team made changes to the app, we were able to see pain points disappear in real time as the comments about them dwindled and general positive comments increased.
