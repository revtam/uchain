import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import React from "react";
import AssessmentRegistrationButton from "../../../action-button/AssessmentRegistrationButton";
import { AssessmentProp } from "../../props";
import AssessmentInfo from "../../base-components/AssessmentInfo";

export type AssessmentCardProps = {
    assessmentRegAndDeregEnabled?: boolean;
};

const AssessmentCard: React.FunctionComponent<AssessmentProp & AssessmentCardProps> = ({
    assessment,
    assessmentRegAndDeregEnabled = false,
}: AssessmentProp & AssessmentCardProps) => {
    return (
        <Box sx={{ width: 400 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography fontWeight={600}>{assessment.title}</Typography>
                    <AssessmentInfo assessment={assessment} />
                </CardContent>
                {assessmentRegAndDeregEnabled && assessment.isRegistrationRequired && (
                    <CardActions>
                        <AssessmentRegistrationButton assessmentId={assessment.id} />
                    </CardActions>
                )}
            </Card>
        </Box>
    );
};

export default AssessmentCard;
