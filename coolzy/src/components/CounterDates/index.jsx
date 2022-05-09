import { Typography } from "@mui/material"

const Dates = ({ invoiceDate, dueDate }) => {
  return (
    <>
      <Typography sx={{ fontSize: '13px', marginLeft: '3rem', color: 'gray' }}>{invoiceDate}</Typography>
    </>
  )
}
export default Dates
