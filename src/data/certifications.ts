export interface Certification {
  CertificationName: string;
  InstituteName: string;
  InstituteLogo: string;
  CertImage: string;
  URL?: string;
  Date: string;
}

export const certifications: Certification[] = [
  {
    CertificationName: "Prompt Engineering & Programming with OpenAI",
    InstituteName: "Columbia University",
    InstituteLogo: "/certs/columbiauniversitylogo.png",
    CertImage: "/certs/COLUMBIA CERTIFICATION Prompt Engineering & Programming with OpenAI_page-0001.jpg",
    URL: "https://badges.plus.columbia.edu/e8aa8e6a-d1f6-40ed-a143-625549fd32e6#acc.VX92qJkn",
    Date: "2025"
  },
  {
    CertificationName: "AI for Managers",
    InstituteName: "Microsoft & LinkedIn",
    InstituteLogo: "/certs/microsoftlogo.png",
    CertImage: "/certs/CertificateOfCompletion_AI for Managers by Microsoft and LinkedIn_page-0001.jpg",
    URL: "https://www.linkedin.com/learning/certificates/8175ebaabe6155b89fd9b8015a996aee54a803f54b5b6b5e56e9297033efe00d?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BLJOk7VYoSKiim4pW6l%2Bf3Q%3D%3D",
    Date: "2025"
  },
  {
    CertificationName: "Project Management Professional Certification Masterclass",
    InstituteName: "Charles Sturt University",
    InstituteLogo: "/certs/CSUlogo.png",
    CertImage: "/certs/Certificate_of_Completion PMP Certification Masterclass_page-0001.jpg",
    URL: "https://www.linkedin.com/in/carlos-alejandro-bolivar/details/certifications/",
    Date: "2025"
  },
  {
    CertificationName: "Kaseya Certified Technician in Cybersecurity",
    InstituteName: "Kaseya",
    InstituteLogo: "/certs/kaseyalogo.png",
    CertImage: "/certs/KCT Certificate Fixed 2025 - Kaseya Certified Technician in Cybersecurity-1_page-0001.jpg",
    URL: "https://www.linkedin.com/in/carlos-alejandro-bolivar/details/certifications/",
    Date: "2025"
  },
  {
    CertificationName: "Auvik Certified Professional",
    InstituteName: "Auvik",
    InstituteLogo: "/certs/auviklogo.png",
    CertImage: "/certs/Auvik_cert.jpg",
    URL: "https://www.linkedin.com/in/carlos-alejandro-bolivar/details/certifications/",
    Date: "2024"
  },
];
