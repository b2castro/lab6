'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);
   
}

function addProject(result){
	console.log(result);
	var de= '<img src="' + result['image'] + '" class="detailsImage"/>' +
		'<p>' + result['title'] + '</p>' +
		'<p><small>' + result['date'] + '</small></p>' +
		result['summary'];
	$("#project" + result.id + " .details").html(de);
}
/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);
    $.get("/project/" + idNumber, addProject);
	console.log("User clicked on project " + idNumber);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
    e.preventDefault();
	$.get("/palette", colorIt);
	console.log("User clicked on color button");
}

function colorIt(result){
    var colors = result['colors'];
	var eh = colors['hex'];
	$('body').css('background-color', eh[0]);
$('.thumbnail').css('background-color', eh[1]);
$('h1, h2, h3, h4, h5, h5').css('color', eh[2]);
$('p').css('color', eh[3]);
$('.project img').css('opacity', 1);
}
