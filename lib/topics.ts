import type { Topic } from "@/types/playbook";

// The full Refine Playbooks roadmap. Published topics carry a slug and
// link to a complete playbook in /content/playbooks. Unpublished topics
// are shown on the roadmap page as "Coming soon" so the taxonomy of the
// full knowledge system is visible from day one, without pretending
// unwritten playbooks already exist.
export const TOPICS: Topic[] = [
  // Foundations
  { title: "Preparation Beats Memorization", category: "Foundations", slug: "preparation-beats-memorization" },
  { title: "Ownership vs. Participation", category: "Foundations", slug: "ownership-vs-participation" },
  { title: "Hiring Isn't Finding Perfection", category: "Foundations", slug: null },
  { title: "Executive Communication Is Clarity", category: "Foundations", slug: null },

  // Candidate Preparation
  { title: "How Candidates Should Prepare Stories", category: "Candidate Preparation", slug: "how-candidates-should-prepare-stories" },
  { title: "Candidate Positioning", category: "Candidate Preparation", slug: null },
  { title: "Candidate Pitching", category: "Candidate Preparation", slug: null },
  { title: "Candidate Mistakes", category: "Candidate Preparation", slug: null },
  { title: "Negotiation", category: "Candidate Preparation", slug: null },

  // Hiring Manager Craft
  { title: "How Hiring Managers Should Read Resumes", category: "Hiring Manager Craft", slug: "how-hiring-managers-read-resumes" },
  { title: "Hiring Manager Communication", category: "Hiring Manager Craft", slug: null },
  { title: "Interview Debriefs", category: "Hiring Manager Craft", slug: null },
  { title: "Offer Decisions", category: "Hiring Manager Craft", slug: null },
  { title: "Hiring Mistakes", category: "Hiring Manager Craft", slug: null },
  { title: "Decision Making", category: "Hiring Manager Craft", slug: null },

  // Evaluation Frameworks
  { title: "How to Evaluate Product Sense", category: "Evaluation Frameworks", slug: "how-to-evaluate-product-sense" },
  { title: "How to Evaluate Strategic Thinking", category: "Evaluation Frameworks", slug: null },
  { title: "How to Assess Executive Communication", category: "Evaluation Frameworks", slug: null },
  { title: "What 0→1 Really Means", category: "Evaluation Frameworks", slug: null },
  { title: "Product Metrics Interviews", category: "Evaluation Frameworks", slug: null },
  { title: "Prioritization", category: "Evaluation Frameworks", slug: null },
  { title: "Product Strategy", category: "Evaluation Frameworks", slug: null },
  { title: "System Design for Product Managers", category: "Evaluation Frameworks", slug: null },
  { title: "Technical Depth", category: "Evaluation Frameworks", slug: null },
  { title: "Product Judgment", category: "Evaluation Frameworks", slug: null },

  // Interview Formats
  { title: "Behavioral Interviews", category: "Interview Formats", slug: "behavioral-interviews" },
  { title: "Leadership Interviews", category: "Interview Formats", slug: null },
  { title: "How to Interview a Director of Product", category: "Interview Formats", slug: null },

  // Hiring by Domain
  { title: "Hiring AI Product Leaders", category: "Hiring by Domain", slug: null },
  { title: "Hiring Payments Product Leaders", category: "Hiring by Domain", slug: null },
  { title: "Hiring Platform Product Leaders", category: "Hiring by Domain", slug: null },
  { title: "Hiring Marketplace Product Leaders", category: "Hiring by Domain", slug: null },

  // Craft & Judgment
  { title: "Commercialization Experience", category: "Craft & Judgment", slug: null },
  { title: "Vendor Management", category: "Craft & Judgment", slug: null },
  { title: "Customer-First Reasoning", category: "Craft & Judgment", slug: null },
  { title: "Influence Without Authority", category: "Craft & Judgment", slug: null },
  { title: "Hiring for Ambiguity", category: "Craft & Judgment", slug: null },
  { title: "Executive Presence", category: "Craft & Judgment", slug: null },

  // Product Leadership
  { title: "Product Leadership", category: "Product Leadership", slug: null },
  { title: "Scaling Teams", category: "Product Leadership", slug: null },
  { title: "Stakeholder Management", category: "Product Leadership", slug: null },
  { title: "Cross-functional Leadership", category: "Product Leadership", slug: null },
  { title: "Vision vs. Execution", category: "Product Leadership", slug: null },
  { title: "Roadmap Ownership", category: "Product Leadership", slug: null },
  { title: "Innovation vs. Delivery", category: "Product Leadership", slug: null },
  { title: "Platform Thinking", category: "Product Leadership", slug: null },
  { title: "Growth Thinking", category: "Product Leadership", slug: null },
  { title: "Customer Thinking", category: "Product Leadership", slug: null },

  // Recruiter Craft
  { title: "Recruiter Intake Calls", category: "Recruiter Craft", slug: null },
  { title: "Boolean Search", category: "Recruiter Craft", slug: null },
  { title: "Follow-up Strategy", category: "Recruiter Craft", slug: null },
  { title: "Market Mapping", category: "Recruiter Craft", slug: null },
  { title: "Closing Candidates", category: "Recruiter Craft", slug: null },
];

export function getTopicsByCategory(): Record<string, Topic[]> {
  return TOPICS.reduce((acc, topic) => {
    if (!acc[topic.category]) acc[topic.category] = [];
    acc[topic.category].push(topic);
    return acc;
  }, {} as Record<string, Topic[]>);
}

export const PUBLISHED_COUNT = TOPICS.filter((t) => t.slug).length;
export const TOTAL_COUNT = TOPICS.length;
