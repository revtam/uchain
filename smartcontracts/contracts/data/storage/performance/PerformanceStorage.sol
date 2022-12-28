pragma solidity >=0.8.7 <=0.8.17;

import "./EvaluationStorage.sol";
import "./ExamAttendanceStorage.sol";
import "./SubmissionStorage.sol";

contract PerformanceStorage is SubmissionStorage, ExamAttendanceStorage, EvaluationStorage {
    constructor(address accessWhitelistAddress) Storage(accessWhitelistAddress) {}
}
