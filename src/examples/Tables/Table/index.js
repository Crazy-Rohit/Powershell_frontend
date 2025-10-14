/*!
=========================================================
* Vision UI Free React - Table Component (Hyperlinks + Hidden Columns)
=========================================================
*/

import { useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

// MUI
import { Table as MuiTable } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// Vision UI Components
import VuiBox from "components/VuiBox";
import VuiAvatar from "components/VuiAvatar";
import VuiTypography from "components/VuiTypography";

// Base Styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";

function Table({ columns, rows }) {
  const { grey } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  // ✅ Filter out the "file_path" column from being rendered
  const visibleColumns = columns.filter((col) => col.name !== "file_path" && col.Header !== "file_path");

  const renderColumns = visibleColumns.map(({ name, align, width }, key) => {
    let pl, pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === visibleColumns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
      <VuiBox
        key={name}
        component="th"
        width={width || "auto"}
        pt={1.5}
        pb={1.25}
        pl={align === "left" ? pl : 3}
        pr={align === "right" ? pr : 3}
        textAlign={align}
        fontSize={size.xxs}
        fontWeight={fontWeightBold}
        color="text"
        opacity={0.7}
        borderBottom={`${borderWidth[1]} solid ${grey[700]}`}
      >
        {name.toUpperCase()}
      </VuiBox>
    );
  });

  const renderRows = rows.map((row, key) => {
    const rowKey = `row-${key}`;

    const tableRow = visibleColumns.map(({ name, align }) => {
      let template;

      // ✅ URL Columns (like screenshot_url) → make clickable
      if (
        typeof row[name] === "string" &&
        (row[name].includes("http://") || row[name].includes("https://"))
      ) {
        template = (
          <VuiBox
            key={uuidv4()}
            component="td"
            p={1}
            textAlign={align}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${grey[700]}` : null}
          >
            <VuiTypography
              variant="button"
              color="info"
              fontWeight="medium"
              sx={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => window.open(row[name], "_blank")}
            >
              View Screenshot
            </VuiTypography>
          </VuiBox>
        );
      }

      // ✅ Array type (Avatar, etc.)
      else if (Array.isArray(row[name])) {
        template = (
          <VuiBox key={uuidv4()} component="td" p={1}>
            <VuiBox display="flex" alignItems="center" py={0.5} px={1}>
              <VuiBox mr={2}>
                <VuiAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
              </VuiBox>
              <VuiTypography color="white" variant="button" fontWeight="medium">
                {row[name][1]}
              </VuiTypography>
            </VuiBox>
          </VuiBox>
        );
      }

      // ✅ Normal Text Columns
      else {
        template = (
          <VuiBox
            key={uuidv4()}
            component="td"
            p={1}
            textAlign={align}
            borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${grey[700]}` : null}
          >
            <VuiTypography
              variant="button"
              fontWeight="regular"
              color="text"
              sx={{ display: "inline-block", width: "max-content" }}
            >
              {row[name]}
            </VuiTypography>
          </VuiBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
    () => (
      <TableContainer>
        <MuiTable>
          <VuiBox component="thead">
            <TableRow>{renderColumns}</TableRow>
          </VuiBox>
          <TableBody>{renderRows}</TableBody>
        </MuiTable>
      </TableContainer>
    ),
    [columns, rows]
  );
}

Table.defaultProps = {
  columns: [],
  rows: [{}],
};

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
