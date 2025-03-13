const express = require("express");
const cors = require("cors");
const fs = require("fs");
const {Document, Packer, Paragraph, TextRun} = require("docx");

const app = express();
app.use(cors());
app.use(express.json());

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
            children: [new TextRun("Ceremony Script")],
            heading: "Heading1",
          }),
          new Paragraph(
            `Couple: ${groomFirstName} ${groomSurname} & ${brideFirstName} ${brideSurname}`,
          ),
          new Paragraph(`Date: ${date}`),
          new Paragraph(`Location: ${venue}`),
          new Paragraph("\nHousekeeping"),
          new Paragraph(
            "Good afternoon, everyone. I hope you're all enjoying this wonderful day...",
          ),

          new Paragraph("\nArrivals"),
          new Paragraph(`${groomFirstName} arrives with the Groomsmen`),
          new Paragraph(`Song: ${groomsmenSong || "N/A"}`),
          new Paragraph(`Bridesmaid Song: ${bridesmaidSong || "N/A"}`),

          new Paragraph("\nGiving Away"),
          new Paragraph(
            `${bridesFather} will be walking ${brideFirstName} down the aisle.`,
          ),
          new Paragraph(
            `${bridesFather}, as ${brideFirstName}'s father, do you give ${brideFirstName}'s hand to ${groomFirstName} today?`,
          ),

          new Paragraph("\nWelcome & Story of the Couple"),
          new Paragraph(
            `Today, ${groomFirstName} and ${brideFirstName} come before us to publicly declare their love and commitment.`,
          ),

          new Paragraph("\nMonitum"),
          new Paragraph(
            "I am duly authorised by law to solemnise marriages according to law...",
          ),

          new Paragraph("\nRing Walk"),
          new Paragraph("Who is Walking the rings down the Aisle?"),

          new Paragraph("\nThe Asking"),
          new Paragraph(
            `${groomFirstName}, do you take ${brideFirstName} to be your lawfully wedded wife?`,
          ),
          new Paragraph(`${groomFirstName}: I do`),

          new Paragraph(`\n${groomFirstName}'s Personal Vows + Legal Vows`),
          new Paragraph(vowsGroom || "To be added"),
          new Paragraph(
            `I call upon the persons here present to witness that I, ${groomFirstName} ${groomSurname}, take thee, ${brideFirstName} ${brideSurname}, to be my lawfully wedded Wife.`,
          ),

          new Paragraph(
            `\n${brideFirstName}, do you take ${groomFirstName} to be your lawfully wedded husband?`,
          ),
          new Paragraph(`${brideFirstName}: I do`),

          new Paragraph(`\n${brideFirstName}'s Personal Vows + Legal Vows`),
          new Paragraph(vowsBride || "To be added"),
          new Paragraph(
            `I call upon the persons here present to witness that I, ${brideFirstName} ${brideSurname}, take thee, ${groomFirstName} ${groomSurname}, to be my lawfully wedded Husband.`,
          ),

          new Paragraph("\nPronouncing"),
          new Paragraph(
            "Friends and family, through the vows they have shared and the rings they have exchanged...",
          ),
          new Paragraph("You may kiss the bride."),

          new Paragraph("\nSigning Table"),
          new Paragraph(
            `We will now proceed with the signing. ${witnessOne} and ${witnessTwo}, please join us as the witnesses.`,
          ),

          new Paragraph("\nPresentation"),
          new Paragraph(
            `Friends and Family, it gives me great pleasure to present to you, Mr. and Mrs. ${groomSurname}.`,
          ),
        ],
      },
    ],
  });

  // Generate the .docx file
  const buffer = await Packer.toBuffer(doc);
  const fileName = `Ceremony_Script_${Date.now()}.docx`;

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
