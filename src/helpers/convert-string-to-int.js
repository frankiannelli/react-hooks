export default (string) => (string.match(/^\d+$/) ? Number(string) : NaN); // checks that the string only contains digit characters
