/**
 * This file holds the postit class
 * and functions related to postit notes
 * 
 * @author Kasper Laukamp
 */


function Postit() {
    this.text = '';
    this.pos = new Vector(100, 100);
    this.background = Color(Random(200, 215), 255, Random(80,125));
    this.isActive = false;
    this.id = guid();
    this.created = new Date().getTime();
    this.colorMode = "hsv"
}

// TODO: prettify this
function Draw(postit) {

    // Create main element
    $el = $('<div class="postit-container"></div>');

    if (postit.isActive)
        $el.addClass('active');
    $el.css({
        "background-color": toCSS(postit.background, RGB),
        "left": postit.pos.x,
        "top": postit.pos.y
    });
    $el.attr("id", postit.id);

    $handle = $('<div class="postit-handle"></div>');
    $handle.append('<div class="postit-delete"></div>');
    $el.append($handle);

    // Create body element
    $body = $('<div class="postit-body"></div>');
    $body.append('<textarea placeholder="Enter your text here">' + postit.text + '</textarea>');

    // Append the postit object to the DOM
    $el.append($body);
    $('body').append($el);
}

function NewPostit() {
    var p = new Postit();
    postits.push(p);
    Draw(p);

    Save('postits', postits)
}

function DeletePostit($el) {
    var parent = $el.closest('.postit-container');
    postits = _.reject(postits, function (obj) { return obj.id == parent.attr('id') });
    Save('postits', postits);
    parent.remove();
}

function SavePostits() {

    var obj;
    // Itereate through all postit-containers
    $('.postit-container').each(function () {
        obj = _.findWhere(postits, { id: $(this).attr('id') });
        if (obj) {
            obj.pos.y = parseInt($(this).css('top'));
            obj.pos.x = parseInt($(this).css('left'));
            obj.text = $(this).find('textarea').val() || '';
            obj.isActive = $(this).hasClass('active');
        }
    });

    Save('postits', postits);
}