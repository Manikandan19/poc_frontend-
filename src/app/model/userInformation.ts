import { UserDetails } from './userDetails';
import { Address } from './address';

export interface UserInfo {
    id:any,
    details: UserDetails,
    address: Address
}