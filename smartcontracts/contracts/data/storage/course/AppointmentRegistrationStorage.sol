pragma solidity >=0.8.7 <=0.8.17;

import "../../../helpers/ArrayOperations.sol";
import "../../../datatypes/CourseDataTypes.sol";
import "./AppointmentStorage.sol";

abstract contract AppointmentRegistrationStorage is AppointmentStorage {
    mapping(uint256 => uint256[]) registrantUIdsListByAppointmentId;
    mapping(uint256 => uint256[]) appointmentIdsListByRegistrantUId; // for reverse lookup

    function storeRegistrant(uint256 appointmentId, uint256 registrantUId)
        external
        onlyWhitelisted
        onlyIfValueExisting(appointmentsByAppointmentId[appointmentId].appointmentId, "Appointment ID")
        onlyIfIdNotAdded(registrantUId, registrantUIdsListByAppointmentId[appointmentId], "Registrant uID")
    {
        ArrayOperations.addUintToListInMapping(
            registrantUId,
            appointmentId,
            registrantUIdsListByAppointmentId
        );
        ArrayOperations.addUintToListInMapping(
            appointmentId,
            registrantUId,
            appointmentIdsListByRegistrantUId
        );
    }

    function removeRegistrant(uint256 appointmentId, uint256 registrantUId)
        external
        onlyWhitelisted
        onlyIfValueExisting(appointmentsByAppointmentId[appointmentId].appointmentId, "Appointment ID")
        onlyIfIdAdded(registrantUId, registrantUIdsListByAppointmentId[appointmentId], "Registrant uID")
    {
        ArrayOperations.removeUintFromListInMapping(
            registrantUId,
            appointmentId,
            registrantUIdsListByAppointmentId
        );
        ArrayOperations.removeUintFromListInMapping(
            appointmentId,
            registrantUId,
            appointmentIdsListByRegistrantUId
        );
    }

    function getRegistrantIdsOfAppointment(uint256 appointmentId)
        external
        view
        onlyWhitelisted
        onlyIfValueExisting(appointmentsByAppointmentId[appointmentId].appointmentId, "Appointment ID")
        returns (uint256[] memory)
    {
        return registrantUIdsListByAppointmentId[appointmentId];
    }

    function getAppointmentIdsOfRegistrant(uint256 registrantUId)
        external
        view
        onlyWhitelisted
        returns (uint256[] memory)
    {
        return appointmentIdsListByRegistrantUId[registrantUId];
    }
}
