import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import useAuthStore from "../../../hooks/auth/authHooks";
import { UserRole } from "../../../utils/converter/contract-types/enums";
import { Assessment } from "../../../utils/converter/internal-types/internalTypes";
import AssessmentRegistrationButton from "../action-button/AssessmentRegistrationButton";
import AssessmentData from "./AssessmentData";

export interface AssessmentCardProps {
    assessment: Assessment;
    assessmentRegAndDeregEnabled?: boolean;
}

const AssessmentCard: React.FunctionComponent<AssessmentCardProps> = ({
    assessment,
    assessmentRegAndDeregEnabled = false,
}: AssessmentCardProps) => {
    const { userRole } = useAuthStore();

    return (
        <Box sx={{ width: 400 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography fontWeight={600}>{assessment.title}</Typography>
                    <AssessmentData assessment={assessment} />
                </CardContent>
                {assessmentRegAndDeregEnabled &&
                    userRole === UserRole.STUDENT &&
                    assessment.isRegistrationRequired && (
                        <CardActions>
                            <AssessmentRegistrationButton assessmentId={assessment.id} />
                        </CardActions>
                    )}
            </Card>
        </Box>
    );
};

export default AssessmentCard;
