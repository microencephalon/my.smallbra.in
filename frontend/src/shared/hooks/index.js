// frontend/src/shared/hooks/index.js
import { useAuth as Auth } from '../../store/contexts/AuthContext';
import AuthStatus from './useAuthStatus';
import Search from './useSearch';
import LiveSearch from './useLiveSearch';
import ScalingTopPadding from './useScalingTopPadding';
import Navbar from './useNavbar';
import ClickOutsideNav from './useClickOutsideNav';
import Roll from './useRoll';
import CodeBlock from './useCodeBlock';
import BlogContent from './useBlogContent';
import BlogPost from './useBlogPost';
import Artifact from './useArtifact';
import Resume from './useResume';
import ResumeContent from './useResumeContent';

export const useAuth = Auth;
export const useAuthStatus = AuthStatus;
export const useSearch = Search;
export const useLiveSearch = LiveSearch;
export const useScalingTopPadding = ScalingTopPadding;
export const useNavbar = Navbar;
export const useClickOutsideNav = ClickOutsideNav;
export const useRoll = Roll;
export const useCodeBlock = CodeBlock;

export const useFetchData = {
  blog: {
    post: BlogPost,
    content: BlogContent,
  },
  portfolio: {
    artifact: Artifact,
  },
  resume: {
    document: Resume,
    content: ResumeContent,
  },
};
