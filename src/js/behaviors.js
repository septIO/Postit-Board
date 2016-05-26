/**
 * This file consists of jQuery behaviors
 * Declare events inhere
 * 
 * @author Kasper Laukamp
 */

$(document).ready(function () {

    var isDragging = false;

    /**
     * when a postit-container is clicked then
     * remove all .active classes from .postit-containers
     * then add the .active class to the selected element
     */
    $("body").on("click", ".postit-container", function () {
        $('.postit-container.active').removeClass('active');
        $(this).addClass('active');
    });

    // TODO: fix this
    $(".postit-container textarea").focus(function () {
        $('.postit-container.active').removeClass('active');
        $(this).parent('.postit-container').addClass('active');
    });

    // Save postits everytime a textarea is changed
    $("body").bind("input propertychange", "textarea", function () {
        SavePostits();
    });

    $("body").on("click", ".postit-delete", function () {
        if (!confirm("Are you sure you want to delete this?")) return;
        DeletePostit($(this));
    });

    $(".add-new-postit").click(function () {
        NewPostit();
    });

    $(".sort-postits").click(function () {
        var startY = 50;
        var startX = 20
        var currentX = startX;
        var currentY = startY;

        postits = _.sortBy(postits, function (obj) { return obj.created });

        $('.postit-container').each(function () {
            var elWidth = parseInt($(this).css('width')) + 5;
            var elHeight = parseInt($(this).css('width')) + 5;
            console.log(elWidth, $(document).width());
            if (currentX + elWidth > $(document).width()) {
                currentX = startX;
                currentY += elHeight;
            }
                
            $(this).css({
                'left': currentX,
                'top': currentY
            });

            currentX += elWidth;
            

        });

        SavePostits();
    })


    /**
     * When the user mouses down on a postit-handlers,
     * set it as active, and wait for the user to move
     * their mouse, and move the element accordingly
     */
    $("body").on("mousedown", ".postit-handle", function (e) {

        // Stop text selection while dragging
        e = e || window.event;
        pauseEvent(e);

        // We use this to make sure we drag
        // on the position we clicked
        // and that the element doesn't jump
        // to the right
        var offset = {
            x: e.pageX - $(this).offset().left,
            y: e.pageY - $(this).offset().top
        };

        // Even though the event is on the handle
        // we actually need the parent element.
        $that = $(this).parent('.postit-container');

        // Remove all active classes from postit containers
        $('.postit-container.active').removeClass('active');

        // Apply the active class on the current element
        $that.addClass('active');


        $(document).on("mousemove", function (e) {

            isDragging = true;

            // We need this to prevent elements from jumping
            // due to the height and width not calculating in
            // the width of the borders
            var borders = {
                top: parseInt($that.css('border-top-width')),
                left: parseInt($that.css('border-left-width')),
                right: parseInt($that.css('border-right-width')),
                bottom: parseInt($that.css('border-bottom-width')),
            }

            // Make sure that the "grapping point" is where the user clicked
            // And not at the upper left corner of the element
            actualPosition = {
                x: e.pageX - offset.x - borders.left,
                y: e.pageY - offset.y - borders.top
            }

            // The width and height of the postit-container
            var elWidth = parseInt($that.css('width'));
            var elHeight = parseInt($that.css('height'));


            // Confine the element to the viewport
            // We need to take the border width into account
            // when going offscreen to the right and the bottom
            // So we have to subtract border-width*2 in order for it
            // to not bug out
            if (confinePostitsToScreen) {
                if (actualPosition.x < 0)
                    actualPosition.x = 0;
                if (actualPosition.x > $(document).width() - elWidth)
                    actualPosition.x = $(document).width() - elWidth - borders.right*2;
                if (actualPosition.y < 0)
                    actualPosition.y = 0;
                if (actualPosition.y > $(document).height() - elHeight)
                    actualPosition.y = $(document).height() - elHeight - borders.bottom*2;
            }

            // Update left and top positions to the new positions
            $that.css({
                'top': actualPosition.y,
                'left': actualPosition.x
            });
        });
    });
    $(document).on("mouseup", function () {
        if (!isDragging) return false;
        isDragging = false;

        // Where ever the user let go of their mouse click
        // stop whatever mousemove function is running
        $(document).off("mousemove");

        SavePostits();
    });


    $(document).click(function () {
        $('.postit-container.active').removeClass('.active');
    })

});

function pauseEvent(e) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
}
