const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
} = require("docx");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

app.use(
  cors({
    origin: "https://ceremony-script.tsharliz.com", // Only allow this domain
    methods: "POST",
    allowedHeaders: ["Content-Type"],
  }),
);

app.post("/generate-doc", async (req, res) => {
  const {
    groomFirstName,
    groomSurname,
    brideFirstName,
    brideSurname,
    date,
    venue,
    witnessOne,
    witnessTwo,
    vowsGroom,
    vowsBride,
    groomsmenSong,
    bridesmaidSong,
    bridesFather,
  } = req.body;

  if (
    !groomFirstName ||
    !groomSurname ||
    !brideFirstName ||
    !brideSurname ||
    !date ||
    !venue
  ) {
    return res.status(400).json({error: "Missing required fields"});
  }

  // Construct the ceremony script document
   const doc = new Document({
     sections: [
       {
         properties: {},
         children: [
           new Paragraph({
             children: [
               new TextRun({
                 text: "Ceremony Script",
                 bold: true,
                 size: 48,
                 font: "Century Gothic",
               }),
             ],
             alignment: AlignmentType.CENTER,
             heading: HeadingLevel.TITLE,
           }),

           new Paragraph({
             text: `Couple: ${groomFirstName} ${groomSurname} & ${brideFirstName} ${brideSurname}`,
             spacing: {after: 300},
             bold: true,
           }),

           new Paragraph({
             text: `Date: ${date}`,
             spacing: {after: 200},
             italic: true,
           }),

           new Paragraph({
             text: `Venue: ${venue}`,
             spacing: {after: 200},
             underline: {},
           }),

           new Paragraph({
             text: `Witnesses: ${witnessOne} & ${witnessTwo}`,
             spacing: {after: 400},
           }),

           // HR Line
           new Paragraph({
             border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
           }),

           new Paragraph({
             children: [
               new TextRun({
                 text: "Welcome & Opening Words",
                 bold: true,
                 size: 36,
                 font: "Century Gothic",
               }),
             ],
             spacing: {before: 400, after: 200},
             alignment: AlignmentType.CENTER,
           }),

           new Paragraph({
             text: `Today, we gather here to celebrate the union of ${groomFirstName} and ${brideFirstName}. Marriage is a beautiful journey that begins today and lasts forever.`,
             spacing: {after: 200},
             alignment: AlignmentType.LEFT,
           }),

           // HR Line
           new Paragraph({
             border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
           }),

           new Paragraph({
             children: [
               new TextRun({
                 text: "Giving Away the Bride",
                 bold: true,
                 size: 36,
                 font: "Century Gothic",
               }),
             ],
             spacing: {before: 400, after: 200},
             alignment: AlignmentType.CENTER,
           }),

           new Paragraph({
             text: `${bridesFather}, as ${brideFirstName}'s father, do you give ${brideFirstName}'s hand to ${groomFirstName} today?`,
             spacing: {after: 200},
             bold: true, // Make names bold
           }),

           // HR Line
           new Paragraph({
             border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
           }),

           new Paragraph({
             children: [
               new TextRun({
                 text: "The Vows",
                 bold: true,
                 size: 36,
                 font: "Century Gothic",
               }),
             ],
             spacing: {before: 400, after: 200},
             alignment: AlignmentType.CENTER,
           }),

           new Paragraph({
             text: `${groomFirstName}, please recite your vows to ${brideFirstName}:`,
             spacing: {after: 200},
             bold: true,
           }),

           new Paragraph({
             text: `"${vowsGroom || "Vows not provided."}"`,
             spacing: {after: 200},
             italic: true,
           }),

           new Paragraph({
             text: `${brideFirstName}, please recite your vows to ${groomFirstName}:`,
             spacing: {after: 200},
             bold: true,
           }),

           new Paragraph({
             text: `"${vowsBride || "Vows not provided."}"`,
             spacing: {after: 200},
             italic: true,
           }),

           // HR Line
           new Paragraph({
             border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
           }),

           new Paragraph({
             children: [
               new TextRun({
                 text: "The Monitum",
                 bold: true,
                 size: 36,
                 font: "Century Gothic",
               }),
             ],
             spacing: {before: 400, after: 200},
             alignment: AlignmentType.CENTER,
           }),

           new Paragraph({
             text: `"I am duly authorized by law to solemnize marriages according to law. Before you are joined in marriage in my presence and in the presence of these witnesses, I am to remind you of the solemn and binding nature of the relationship into which you are now about to enter."`,
             spacing: {after: 200},
             bold: true, // The entire Monitum statement is bold
           }),

           // HR Line
           new Paragraph({
             border: {bottom: {style: BorderStyle.SINGLE, size: 6}},
           }),

           new Paragraph({
             children: [
               new TextRun({
                 text: "Final Pronouncement",
                 bold: true,
                 size: 36,
                 font: "Century Gothic",
               }),
             ],
             spacing: {before: 400, after: 200},
             alignment: AlignmentType.CENTER,
           }),

           new Paragraph({
             text: `By the power vested in me, I now pronounce you ${groomFirstName} and ${brideFirstName} as officially married. You may now kiss! 🎉`,
             spacing: {after: 400},
             bold: true,
           }),

           new Paragraph({
             text: `Congratulations to Mr. and Mrs. ${groomSurname}!`,
             spacing: {after: 600},
             alignment: AlignmentType.CENTER,
             bold: true,
           }),
         ],
       },
     ],
   });

  // Generate the .docx file
  const buffer = await Packer.toBuffer(doc);
  const fileName = `Ceremony Script - ${brideFirstName} and ${groomFirstName} - ${Date.now()}.docx`;

  // Send the file for download
  res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  );
  res.send(buffer);
});

// Start the server
const PORT = process.env.PORT || 5600;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
