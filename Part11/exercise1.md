In Node.js some of the tools for linting, testing and building are:
Linting: Eslint - This is a widely used linter for Javascript 
Test: Jest - Another popular Javascript test framework that allows you to write test cases for Nodejs applications 
Building: npm - which is the default package manager for Node.js, which can be used to define build scripts and run various build tasks.
All these tools that I mentioned can be integrated into a CI setup using popular CI/CD platforms like Jenkins, Github Actions or Gitlab CI/CD

- based on my research there is gitlab CI/CD. It allows you to execute jobs in Docker containers, supports pipelines, and can be self-hosted if desired. There is also Travis CI A hosted CI service that integrates well with GitHub repositories. It supports various programming languages and frameworks, and offers a simple configuration process.

To determine whether a selfhosted or cloud based environment would be suitable fo the project then these are the factors that need to be considered. budget, scalability, technical expertise, security, availability, compliance and regulations, disaster recovery and backup and performance requirements

Budget - a selfhosted environment needs upfront investment in hardware and maintenance cost while cloud based environment follows a pay as you go model

Scalability - cloud based is typacilly more flexible vs a selfhosted one which requires hardware purchase and complex planning

Technical expertise - selfhosted need to have expertise for setup while cloud requires less

Security - selfhosted provides more control over security while cloud also employs similar level of security but with the risk of data privacy concern

Availability - cloud offer high availability and redundancy while self hosted can achive this but need careful planning of redundancy

Disaster recovery - some cloud offers automated backup redundancy and disaster recovery solution while self hosted need you to implement these mechanism

Performance - cloud offers opportunity for distibuted architectures and CDN while selfhosted might require specialized hardware and optimization
