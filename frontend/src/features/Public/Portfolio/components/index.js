import { Previews } from './ArtifactPreviews';
import { Link, Links } from './ArtifactLink';
import { ArtifactSpinner as Spinner } from '../../../../shared/components/common/Spinners';
import { Text } from './ArtifactText';
import { PortfolioArtifactContainer as Container } from './ArtifactContainer';
import ArtifactCard from './Card';
const Portfolio = {
  Roll: { Card: ArtifactCard },
  Artifact: { Previews, Link, Links, Spinner, Text, Container },
};

export default Portfolio;
