import Image from 'next/image';
import type { Project } from '~/lib/projects';

interface VisualGalleryProps {
  project: Project;
}

export function VisualGallery({ project }: VisualGalleryProps) {
  // If no images, don't render the section
  if (!project.images || project.images.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
        <span className="text-gray-500">{'//'}</span> Visual Documentation
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.images.map((image) => (
          <div key={`image-${image}`} className="border border-gray-800 rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={`${project.title} - Interface screenshot showing ${project.title.toLowerCase()} functionality`}
              width={800}
              height={600}
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}