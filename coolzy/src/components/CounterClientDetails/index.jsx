import { Typography } from "@mui/material"
const ClientDetails = ({ clientName, clientAddress }) => {
  return (
    <div style={{
      marginLeft: '3rem',
      maxWidth: '100%'
    }}>
      <Typography
        style={{
          fontSize: '13px',
          color: 'grey',
          letterSpacing: '1px'
        }}
      >
        BILL TO
      </Typography>
      <Typography
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          color: 'black'
        }}
      >
        {clientName}
      </Typography>
      <Typography
        style={{
          fontSize: '14px',
          fontStyle: 'italic',
          color: 'black'
        }}
      >
        {clientAddress}
      </Typography>
    </div>
  )
}
export default ClientDetails;
