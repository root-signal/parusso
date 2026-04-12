---
title: "Implementing an accessibility testing strategy"
subtitle: "Ad Hoc"
layout: "project"
summary: "I developed an accessibility checklist to test all the changes we put in front of users."
previewImage: 
  src: "img/a11y-checklist.png"
  altText: "A stylized graphic of a checklist, with various accessibility testing criteria, some checked off as successful, some as failed, and some not tested yet."
slug: "accessibility-testing"
weight: 50 # Use this to set the order it appears in the projects list
# Description and images are for search results, social media posts, etc
description: "How we implemented an accessibility testing process to improve the team's knowledge of common accessibility issues and test all the changes we put in front of users."
images: ["/img/a11y-checklist.png"]

---

![Accessibility Testing Checklist](/img/a11y-checklist.png)

{{< intro >}}
I implemented an accessibility testing process to improve the team's knowledge of common accessibility issues and test all the changes we put in front of users.
{{< /intro >}}

### Background

Accessibility is a core need for health care tools. This client's users rely on assistive technology at a higher rate than most populations. Our team had accessibility criteria built into our automated tests, but they didn’t catch everything. And we needed to learn how to test our tools with screen readers.

### My work

I wrote up an accessibility testing checklist that included screen reader testing along with other basic tests like checking for heading hierarchy, color contrast, and functionality at different zoom levels. I trained UX and developers how to use the screen readers they had access to. We added the checklist to the testing acceptance criteria on every ticket that changed the user interface.

### Outcome

The team gained a deeper understanding of navigating web tools in non-visual ways, and started catching many new issues. While we didn't achieve A11Y perfection, every improvement we found through the new testing process clarified the experience for all users.