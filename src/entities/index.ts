/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: ourapproach
 * Interface for OurApproach
 */
export interface OurApproach {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  point1?: string;
  /** @wixFieldType text */
  point2?: string;
  /** @wixFieldType text */
  point3?: string;
  /** @wixFieldType text */
  point4?: string;
  /** @wixFieldType text */
  point5?: string;
}


/**
 * Collection ID: services
 * Interface for Services
 */
export interface Services {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  serviceName?: string;
  /** @wixFieldType text */
  serviceDescription?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  serviceImage?: string;
  /** @wixFieldType text */
  ctaLabel?: string;
  /** @wixFieldType url */
  ctaLink?: string;
}
