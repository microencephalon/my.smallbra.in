import { Link as RRDomLink } from 'react-router-dom';
import { ButtonGroup, Button, Text, UL } from '@blueprintjs/core';

export const ArtifactLinksHeader = ({ children }) => {
  return (
    <Text tagName='h2' className='artifact-h2'>
      {children}
    </Text>
  );
};

export const ArtifactLinksGroup = ({ children }) => {
  return (
    <ButtonGroup>
      <UL className='artifact-links-list'>{children}</UL>
    </ButtonGroup>
  );
};

export const ArtifactLink = ({ id, inlink, icon }) => {
  return (
    <li>
      <RRDomLink to={inlink} target='_blank' className='artifact-links'>
        <Button
          id={id}
          outlined={true}
          icon={icon}
          text={inlink}
          className='artifact-links'
        />
      </RRDomLink>
    </li>
  );
};

export const Link = ArtifactLink;

export const Links = {
  Header: ArtifactLinksHeader,
  Group: ArtifactLinksGroup,
  Link: ArtifactLink,
};
