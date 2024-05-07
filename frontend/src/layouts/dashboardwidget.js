import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { fShortenNumber } from '../util/format-number';
import React from 'react';

export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx, ...other }) {
    return (
        <Card
            component={Stack}
            spacing={3}
            direction="row"
            alignItems="center"
            justifyContent="center" // Center items horizontally
            sx={{
                px: 3,
                py: 5,
                borderRadius: 2,
                ...sx,
            }}
            {...other}
        >
            {/* Adjusting width and height of the icon */}
            {icon && (
                <Box sx={{ width: 64, height: 64, display: 'flex', alignItems: 'center', margin: "auto", justifyContent: 'start' }}>
                    {React.cloneElement(icon, { style: { fontSize: 40 } })}
                </Box>
            )}

            <Stack spacing={0.5} sx={{ display: 'flex', margin: "auto", textAlign: 'start', justifyContent: 'start' }}>
                <Typography variant="h4" sx={{ textAlign: 'center' }}>{fShortenNumber(total)}</Typography>
                <Typography variant="subtitle2" sx={{ color: 'text.disabled', textAlign: 'center' }}>
                    {title}
                </Typography>
            </Stack>
        </Card>
    );
}

AppWidgetSummary.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    sx: PropTypes.object,
    title: PropTypes.string,
    total: PropTypes.number,
};
