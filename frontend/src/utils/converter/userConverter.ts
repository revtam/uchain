import { UserResponse } from "../../imports/ethereum-abi-types/UserView";
import { Name, User } from "./internal-types/internalTypes";

export const convertUserToNameInternal = (user: UserResponse): Name => ({
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
});

export const convertToUserInternal = (user: UserResponse): User => ({
    id: user.uId.toString(),
    name: convertUserToNameInternal(user),
});
