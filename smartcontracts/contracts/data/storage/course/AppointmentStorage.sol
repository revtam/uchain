pragma solidity >=0.8.7 <=0.8.17;

import "../../../datatypes/CourseDataTypes.sol";
import "./AssessmentStorage.sol";

abstract contract AppointmentStorage is AssessmentStorage {
    mapping(uint256 => CourseDataTypes.Appointment[]) appointmentsListByAssessmentId;
    mapping(uint256 => uint256) assessmentIdsByAppointmentId; // for reverse lookup
    mapping(uint256 => CourseDataTypes.Appointment) appointmentsByAppointmentId; // for the easier lookup

    function storeAppointment(uint256 assessmentId, CourseDataTypes.Appointment calldata appointment)
        external
        onlyWhitelisted
        onlyIfValueExisting(assessmentsByAssessmentId[assessmentId].assessmentId, "Assessment ID")
        onlyIfIdValid(appointment.appointmentId, "Appointment ID")
        onlyIfIdNotAdded(
            appointment.appointmentId,
            getAppointmentIdsFromAppointmentList(appointmentsListByAssessmentId[assessmentId]),
            "Appointment ID"
        )
    {
        CourseDataTypes.Appointment[] storage appointments = appointmentsListByAssessmentId[assessmentId];
        appointments.push(appointment);
        appointmentsListByAssessmentId[assessmentId] = appointments;
        assessmentIdsByAppointmentId[appointment.appointmentId] = assessmentId;
        appointmentsByAppointmentId[appointment.appointmentId] = appointment;
    }

    function getAppointment(uint256 appointmentId)
        external
        view
        onlyWhitelisted
        onlyIfValueExisting(appointmentsByAppointmentId[appointmentId].appointmentId, "Appointment ID")
        returns (CourseDataTypes.Appointment memory)
    {
        return appointmentsByAppointmentId[appointmentId];
    }

    function getAssessmentIdOfAppointment(uint256 appointmentId)
        external
        view
        onlyWhitelisted
        onlyIfValueExisting(appointmentsByAppointmentId[appointmentId].appointmentId, "Appointment ID")
        returns (uint256)
    {
        return assessmentIdsByAppointmentId[appointmentId];
    }

    function getAppointments(uint256 assessmentId)
        external
        view
        onlyWhitelisted
        onlyIfValueExisting(assessmentsByAssessmentId[assessmentId].assessmentId, "Assessment ID")
        returns (CourseDataTypes.Appointment[] memory)
    {
        return appointmentsListByAssessmentId[assessmentId];
    }

    // PRIVATE FUNCTIONS

    function getAppointmentIdsFromAppointmentList(CourseDataTypes.Appointment[] memory appointmentList)
        private
        pure
        returns (uint256[] memory)
    {
        uint256[] memory appointmentIds = new uint256[](appointmentList.length);
        for (uint256 i = 0; i < appointmentList.length; ++i) {
            appointmentIds[i] = appointmentList[i].appointmentId;
        }
        return appointmentIds;
    }
}
