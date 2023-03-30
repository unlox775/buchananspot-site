<?xml version="1.0" encoding="ISO-8859-1"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
   <xsl:output method="html"></xsl:output><xsl:variable name="rheader">  Railways for this location:<br/></xsl:variable><xsl:template match="UTAH1908">
  <html>
         <head>         <title>Utah Almanac ca. 1908</title>         <link rel="stylesheet" type="text/css"             href="xmlU1908.css"/>         <script type="text/javascript"             src="xmlU1908.js"></script>         </head>   <body onLoad="restoreCondition()">
<xsl:element name="input">
     <xsl:attribute name="type">         <xsl:value-of select="'text'"/>     </xsl:attribute>     <xsl:attribute name="ID">         <xsl:value-of select="'loader'"/>     </xsl:attribute>     <xsl:attribute name="Name">         <xsl:value-of select="'loader'"/>     </xsl:attribute><xsl:attribute name="style">display:none</xsl:attribute>
     <xsl:attribute name="value"><xsl:apply-templates select="COUNTIES"/></xsl:attribute></xsl:element>
<h3>Interactive Utah 1908 Almanac</h3>Click on a letter for a list of places so named:

<table border="1">
      <tr>
<td  valign="top" width="150">
<xsl:apply-templates select="LOCATIONS"/>
<hr width="149"/>
</td>
<td valign="top" width="700">
Railway Information (if applicable):<br/>
<xsl:apply-templates select="RAIL1908"/><p/>
<a id="CNINFO" href="Utah1908.html">County Info</a>
<img id="CMAP" src="MoneyOrder.gif" align="top"></img>
</td>
</tr>
</table>
  </body>
  </html>
</xsl:template>

<xsl:template match="ALPHA">
      <span class="trigger">      <xsl:attribute name="onClick">
         visualSet('none','<xsl:value-of select="@id"/>','');         setRailInfo('none');      </xsl:attribute>         <img src="closed.gif">      </img>         <xsl:value-of select="@id"/>      <br/>      </span>         <span class="ALPHA">      <xsl:attribute name="id">         <xsl:value-of select="@id"/>      </xsl:attribute>      <xsl:apply-templates/>      </span>
   </xsl:template>

<xsl:template match="PLACE">
      <span class="trigger">      <xsl:attribute name="onClick">         visualSet('<xsl:value-of select="COUNTY"/>','*','<xsl:value-of select="NAME"/>' + ", " + '<xsl:value-of select="COUNTY"/>');         setRailInfo('<xsl:value-of select="RAIL"/>');      </xsl:attribute>      <xsl:value-of select="NAME"/>, <xsl:value-of select="COUNTY"/>      <br/>
      </span>
      <span class="PLACE">      <xsl:attribute name="id">         <xsl:value-of select="NAME"/>, <xsl:value-of select="COUNTY"/>
      </xsl:attribute>
      <xsl:choose>        <xsl:when test="POP = 'x'">           Population is unknown or less than 100.<br/>
        </xsl:when>
        <xsl:otherwise>           Population: <xsl:value-of select="POP"/><br/>
       </xsl:otherwise>      </xsl:choose>       Index: <xsl:value-of select="INDEX"/><br/>
       Rail: <xsl:value-of select="RAIL"/><br/>
       Express: <xsl:value-of select="EXPR"/><br/>
      <xsl:if test="CSEAT = 'Y'">       Town is a County Seat.<br/>
      </xsl:if>
      <xsl:if test="PO = 'Y'">       Town has a Post Office.<br/>
      </xsl:if>
      <xsl:if test="MO = 'Y'">       Place is a Mail Order Post Office.<br/>
      </xsl:if>
      <xsl:if test="TGRAF = 'Y'">       Place is a telegraph office.<br/>
      </xsl:if>
      <xsl:if test="PPEX = 'Y'">       Place is a Prepaid Express station.<br/>
      </xsl:if>
      <xsl:if test="contains(BANK, 'ank')">       Banks: <xsl:value-of select="BANK"/><br/>
      </xsl:if>
      <xsl:if test="string-length(normalize-space(OTHER)) &gt; 0">       Other: <xsl:value-of select="OTHER"/>
      </xsl:if>
      </span>
   </xsl:template>

<xsl:template match="RAILINX">
      <span class="RAILINX">      <xsl:attribute name="id">RAIL<xsl:value-of select="INDEX"/></xsl:attribute>
<xsl:attribute name="style">display:none</xsl:attribute>
     <xsl:value-of select="INDEX"/> - 
     <xsl:value-of select="DESC"/><br/>
      </span>
   </xsl:template>

<xsl:template match="COUNTY"><xsl:value-of select="NAME"/>;<xsl:value-of select="CSEAT"/>;<xsl:value-of select="INDX"/>;<xsl:value-of select="POP"/>;<xsl:value-of select="URL"/>$</xsl:template>

<xsl:template name="show-RR">

</xsl:template>

</xsl:stylesheet>
