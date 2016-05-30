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
        setActivePostit($(this));
    });

    // Save postits everytime a textarea is changed
    $("body").bind("input propertychange", "textarea", function () {
        SavePostits();
    });

    $("body").on("click", ".postit-delete", function () {
        if (!confirm("Are you sure you want to delete this?")) return;
        DeletePostit($(this));
    });

    $("body").on("click", ".postits-delete-all", function () {
        if (!confirm("Are you sure you want to delete ALL postits?")) return;
        $('.postit-container').each(function () {
            DeletePostit($(this));
        });
    });

    $("textarea").on("focus", function () {
        setActivePostit($(this));
    })

    $(".add-new-postit").click(function () {
        NewPostit();
    });

    $('#color-picker').on("move.spectrum", function (e, color) {
        var obj = _.findWhere(postits, { isActive: true });
        bg = 'rgba(' + parseInt(color._r) + ',' + parseInt(color._g) + ',' + parseInt(color._b) + ',' + parseInt(color._a * 100) + ')';
        obj.background.red = color._r;
        obj.background.green = color._g;
        obj.background.blue = color._b;

        obj.background.alpha = color._a * 100;
        obj.colorMode = color._format;
        var bg;

        console.log(color, obj);

        $('#' + obj.id).css({
            'background-color': bg
        });
        SavePostits();
    });

    $(".sort-postits").click(function () {
        var startY = 50;
        var startX = 20
        var currentX = startX;
        var currentY = startY;

        postits = _.sortBy(postits, function (obj) { return -obj.created });

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

        // Clear the active classes when sorting
        $('.postit-container.active').removeClass('active');

        SavePostits();
    })


    /**
     * When the user mouses down on a postit-handlers,
     * set it as active, and wait for the user to move
     * their mouse, and move the element accordingly
     */
    $("body").on("mousedown", ".postit-handle", function (e) {
        isDragging = false;
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

        setActivePostit($(this));


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
                    actualPosition.x = $(document).width() - elWidth - borders.right * 2;
                if (actualPosition.y < 0)
                    actualPosition.y = 0;
                if (actualPosition.y > $(document).height() - elHeight)
                    actualPosition.y = $(document).height() - elHeight - borders.bottom * 2;
            }

            // Update left and top positions to the new positions
            $that.css({
                'top': actualPosition.y,
                'left': actualPosition.x
            });
        });
    });
    $(document).on("mouseup", function () {
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

function setActivePostit($postit) {
    $('.postit-container.active').removeClass('active');

    var $container;
    if ($postit.hasClass('.postit-container'))
        $container = $postit;

    else if ($postit.hasParent('.postit-container'))
        $container = $postit.closest('.postit-container');

    $container.addClass('active');

}