import Image from 'next/image';
import { Project } from '~/lib/projects';

interface VisualGalleryProps {
  project: Project;
}

export function VisualGallery({ project }: VisualGalleryProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-2">
        <span className="text-gray-500">{'//'}</span> Visual Documentation
      </h2>

      {project.images && project.images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {project.images.map((image, index) => (
            <div key={index} className="border border-gray-800 rounded-lg overflow-hidden">
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
      ) : (
        <div className="space-y-4">
          {/* Architecture Diagram Placeholder */}
          <div className="p-8 bg-gray-900/30 border-2 border-dashed border-gray-700 rounded-lg text-center">
            <div className="text-gray-500 mb-2">
              <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-400 mb-2">Architecture Diagram</h3>
            <p className="text-gray-500 text-sm">
              <span className="text-yellow-400">TODO:</span> Add system architecture visualization
            </p>
          </div>

          {/* Screenshots Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-gray-900/30 border-2 border-dashed border-gray-700 rounded-lg text-center">
              <div className="text-gray-500 mb-2">
                <svg className="w-12 h-12 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="text-sm font-medium text-gray-400 mb-1">User Interface</h4>
              <p className="text-gray-500 text-xs">
                <span className="text-yellow-400">TODO:</span> Add UI screenshots
              </p>
            </div>

            <div className="p-6 bg-gray-900/30 border-2 border-dashed border-gray-700 rounded-lg text-center">
              <div className="text-gray-500 mb-2">
                <svg className="w-12 h-12 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h4 className="text-sm font-medium text-gray-400 mb-1">Results Dashboard</h4>
              <p className="text-gray-500 text-xs">
                <span className="text-yellow-400">TODO:</span> Add metrics visualization
              </p>
            </div>
          </div>

          {/* Data Flow Diagram Placeholder */}
          <div className="p-8 bg-gray-900/30 border-2 border-dashed border-gray-700 rounded-lg text-center">
            <div className="text-gray-500 mb-2">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-400 mb-2">Data Flow Visualization</h3>
            <p className="text-gray-500 text-sm">
              <span className="text-yellow-400">TODO:</span> Add pipeline and data flow diagrams
            </p>
          </div>
        </div>
      )}
    </section>
  );
}