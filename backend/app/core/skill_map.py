# Skill to responsibility mapping
SKILL_MAPPING = {
    "Python": [
        "Develop and maintain Python-based applications",
        "Write clean, maintainable code following PEP standards",
        "Implement automated testing and CI/CD pipelines",
        "Optimize application performance and scalability"
    ],
    "React": [
        "Build responsive web interfaces using React",
        "Implement component-based architecture",
        "Optimize application performance and user experience",
        "Develop reusable component libraries"
    ],
    "JavaScript": [
        "Develop interactive front-end features",
        "Implement modern ES6+ JavaScript patterns",
        "Debug and optimize client-side code",
        "Ensure cross-browser compatibility"
    ],
    "Node.js": [
        "Build scalable server-side applications",
        "Design and implement RESTful APIs",
        "Manage asynchronous operations and event-driven architecture",
        "Optimize backend performance and throughput"
    ],
    "SQL": [
        "Design and optimize database schemas",
        "Write complex queries for data analysis",
        "Ensure data integrity and security",
        "Implement database migrations and version control"
    ],
    "AWS": [
        "Deploy and manage cloud infrastructure",
        "Implement serverless architectures",
        "Optimize cloud costs and performance",
        "Ensure high availability and disaster recovery"
    ],
    "Docker": [
        "Containerize applications for consistency",
        "Manage multi-container deployments",
        "Optimize container images and orchestration",
        "Implement Docker-based CI/CD workflows"
    ],
    "Git": [
        "Manage version control workflows",
        "Collaborate using pull requests and code reviews",
        "Maintain clean commit history",
        "Implement branching strategies"
    ],
    "TypeScript": [
        "Implement type-safe JavaScript applications",
        "Design robust interfaces and types",
        "Improve code quality and maintainability",
        "Migrate JavaScript codebases to TypeScript"
    ],
    "Machine Learning": [
        "Develop and train ML models",
        "Perform data preprocessing and feature engineering",
        "Deploy models to production environments",
        "Monitor and optimize model performance"
    ],
    "Java": [
        "Develop enterprise-grade Java applications",
        "Implement design patterns and best practices",
        "Build microservices architectures",
        "Optimize application performance"
    ],
    "Go": [
        "Build high-performance backend services",
        "Implement concurrent programming patterns",
        "Develop scalable microservices",
        "Optimize for low latency and high throughput"
    ],
    "Kubernetes": [
        "Orchestrate containerized applications",
        "Manage cluster configurations and deployments",
        "Implement auto-scaling and load balancing",
        "Monitor cluster health and performance"
    ],
    "MongoDB": [
        "Design NoSQL database schemas",
        "Implement efficient data models",
        "Optimize query performance",
        "Manage database replication and sharding"
    ],
    "REST API": [
        "Design RESTful API endpoints",
        "Implement API versioning and documentation",
        "Ensure API security and authentication",
        "Monitor API performance and usage"
    ]
}

def get_responsibilities_for_skills(skills: list) -> list:
    """Generate responsibilities based on selected skills"""
    responsibilities = []
    for skill in skills:
        if skill in SKILL_MAPPING:
            responsibilities.extend(SKILL_MAPPING[skill][:2])  # Take first 2 for each skill
    return responsibilities