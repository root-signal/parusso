---
title: "Using continuous discovery to inform the roadmap"
subtitle: "Ad Hoc | Department of Veterans Affairs"
layout: "project"
summary: "
I developed a process for analyzing user feedback that helped our team identify high-value features, catch and fix production bugs that were directly affecting users, and track the success of releases."
previewImage: 
  src: "img/tracked-feedback.png"
  altText: "Spreadsheet used to track and categorize user feedback" 
slug: "continuous-discovery"
weight: 10 # Use this to set the order it appears in the projects list
# Description and images are for search results, social media posts, etc
description: "Establishing a continuous discovery process to analyze user feedback, identify high-value features, and track release success for VA health tools."
images: ["/img/tracked-feedback.png"]

---

{{< intro >}}
I developed a process for analyzing user feedback that helped our team identify high-value features, catch and fix production bugs that were directly affecting users, and track the success of releases.
{{< /intro >}}

## Background

Every day the team would receive 50-100 comments about the appointments tool through anonymous surveys. We needed a process to understand the most important needs users were reporting, and whether we were really mitigating issues when we addressed them.

## My work

I developed a method to analyze the feedback for themes, sentiment, and feature requests, as well as a structure to regularly report out the findings:

- I captured all the feedback in Excel, as all data needed to remain on the VA network to avoid exposing PHI/PII, and getting buy-in on using new tools was a challenge.
- I coded the themes that came up regularly, along with feature requests, bugs, and outage reports.
- I set up regular reports on the themes from feedback to the team and stakeholders. I brought users' top asks to roadmap discussions. 
- During major releases, I monitored feedback daily, and tracked user behavior data in Google Analytics and Datadog. If issues started emerging, we could pull the feature quickly.

I refined this process over the course of 6 months to help the team and stakeholders develop a shared understanding of the most common recurring pain points, feature requests, and positive themes. 


![Spreadsheet used to track and categorize user feedback](/img/tracked-feedback.png)


Making this accessible to the entire team helped create a dynamic where we would check the feedback for trends during the time after we released features.

## Outcome

This tool made life easier for the team in a few ways.

- It gained immediate use as a lagging indicator of errors. When users complained about issues we introduced, I was able to quickly file bugs for the team to investigate. 
- Longer term, it helped us understand which features would have the most impact for users. Rescheduling and better data around appointments came up regularly as top requests, and I brought quotes from users explaining why these things would improve their lives to roadmap planning sessions.
- As the team made changes to the tool, we were able to see pain points disappear in real time as the comments about them dwindled and general positive comments increased. The feedback became a catalyst for the team to celebrate wins, as well as make improvements.
