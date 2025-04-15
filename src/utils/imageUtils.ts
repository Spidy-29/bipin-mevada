// This file serves as a centralized place to manage all project images
// You can easily add, remove, or update project images here without touching the component

export interface ProjectImage {
  id: number;
  image: string;
  featured?: boolean; // Optional property to make certain images larger in the grid
}

// Add your project images here
export const projectImages: ProjectImage[] = [
  {
    id: 1,
    image: "/images/1.jpg",
    featured: true,
  },
  {
    id: 3,
    image: "/images/3.jpg",
  },
  {
    id: 2,
    image: "/images/2.jpg",
  },
  {
    id: 4,
    image: "/images/4.jpg",
  },
  {
    id: 5,
    image: "/images/5.jpg",
  },
  {
    id: 6,
    image: "/images/6.jpg",
  },
  {
    id: 7,
    image: "/images/11.jpg",
    featured: true,
  },
  {
    id: 8,
    image: "/images/8.jpg",
  },
  {
    id: 9,
    image: "/images/9.jpg",
  },
  {
    id: 10,
    image: "/images/10.jpg",
  },
  {
    id: 11,
    image: "/images/7.jpg",
  },
  {
    id: 12,
    image: "/images/12.jpg",
  },
  {
    id: 13,
    image: "/images/13.jpg",
  },
];

// Function to get all project images
export const getAllProjectImages = (): ProjectImage[] => {
  return projectImages;
};

// Function to get a specific project image by ID
export const getProjectImageById = (id: number): ProjectImage | undefined => {
  return projectImages.find((project) => project.id === id);
};
