import { Card as MuiCard, CardProps, CardContent, Typography } from '@mui/material';

interface CustomCardProps extends CardProps {
  title?: string;
  children: React.ReactNode;
}

export const Card = ({ title, children, ...props }: CustomCardProps) => {
  return (
    <MuiCard {...props}>
      <CardContent>
        {title && (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        )}
        {children}
      </CardContent>
    </MuiCard>
  );
};
