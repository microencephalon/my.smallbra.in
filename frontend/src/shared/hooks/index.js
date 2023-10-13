// frontend/src/shared/hooks.js
import { useAuth as Auth } from '../../store/contexts/AuthContext';
import AuthStatus from './useAuthStatus';
import Search from './useSearch';
import LiveSearch from './useLiveSearch';
import Navbar from './useNavbar';
import Roll from './useRoll';

export const useAuth = Auth;
export const useAuthStatus = AuthStatus;
export const useSearch = Search;
export const useLiveSearch = LiveSearch;
export const useNavbar = Navbar;
export const useRoll = Roll;
