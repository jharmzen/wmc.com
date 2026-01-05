import { WMCFooter, SectionHeader } from '../components';


interface UnderConstructionProps {
  icon: string;
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({
  icon,
  title,
  subtitle = "This page is currently under construction.",
  description = "We're working hard to bring you the best content. Check back soon for updates!",
  className = '',
}) => {
  return (
    <div className="min-h-screen bg-white">

      <div className={`w-full text-center pt-20 ${className}`}>
        <div className="w-24 h-24 bg-gradient-to-br from-[#4782b5] to-[#0d203b] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
          <i className={`fas ${icon} text-white text-3xl`} aria-hidden="true"></i>
        </div>
        <SectionHeader
          title={title}
          subtitle={subtitle}
          description={description}
          centered={true}
          fullWidth={true}
        />
      </div>

      <WMCFooter />
    </div>
  );
};

export default UnderConstruction;