(function($) {

    $(document).ready(function() {

        const $btnCarousel = $('.btn-carousel');
        const $cards = $('.image-card-carousel');

        const transitionDuration = 1000;

        let isAnimating = false;


        $btnCarousel.on('click', function() {

            // No permitir otra transición mientras la actual termina
            if (isAnimating) {
                return;
            }

            // Si ya estamos en esa imagen, no hacer nada
            if ($(this).hasClass('active')) {
                return;
            }


            /*
             * -----------------------------------------
             * OBTENER ÍNDICES
             * -----------------------------------------
             */

            const $currentBtn = $btnCarousel.filter('.active');

            const currentItemNumber =
                Number(
                    $currentBtn
                        .attr('class')
                        ?.match(/btn-carousel-(\d+)/)?.[1] || 0
                );


            const targetItemNumber =
                Number(
                    $(this)
                        .attr('class')
                        .match(/btn-carousel-(\d+)/)?.[1] || 0
                );


            if (!targetItemNumber) {
                return;
            }


            /*
             * -----------------------------------------
             * TARJETAS
             * -----------------------------------------
             */

            const $currentCard =
                $cards.filter('.active');

            const $targetCard =
                $(`.carousel-${targetItemNumber}`);


            if (!$currentCard.length || !$targetCard.length) {
                return;
            }


            /*
             * -----------------------------------------
             * DIRECCIÓN
             * -----------------------------------------
             */

            const goingNext =
                targetItemNumber > currentItemNumber;


            isAnimating = true;


            /*
             * -----------------------------------------
             * LIMPIAR CUALQUIER ESTADO ANTERIOR
             * -----------------------------------------
             */

            $cards.removeClass(
                'enter-right enter-left leaving-left leaving-right'
            );


            /*
             * -----------------------------------------
             * 1. COLOCAR B FUERA DE LA PANTALLA
             * -----------------------------------------
             */

            if (goingNext) {

                // B viene desde la derecha
                $targetCard.addClass('enter-right');

            } else {

                // B viene desde la izquierda
                $targetCard.addClass('enter-left');
            }


            /*
             * MUY IMPORTANTE:
             *
             * Forzamos al navegador a aplicar realmente
             * translateX(100%) / translateX(-100%)
             * antes de iniciar la animación.
             */

            void $targetCard[0].offsetWidth;


            /*
             * -----------------------------------------
             * 2. HACER SALIR A
             * -----------------------------------------
             */

            if (goingNext) {

                $currentCard.addClass('leaving-left');

            } else {

                $currentCard.addClass('leaving-right');
            }


            /*
             * -----------------------------------------
             * 3. HACER ENTRAR B
             * -----------------------------------------
             *
             * Aquí es donde ocurre la transición.
             *
             * B pasa de:
             *
             * translateX(100%)
             *
             * a:
             *
             * translateX(0)
             */

            $targetCard.addClass('active');


            /*
             * -----------------------------------------
             * 4. ACTUALIZAR BOTÓN
             * -----------------------------------------
             */

            $(this)
                .addClass('active')
                .siblings()
                .removeClass('active');


            /*
             * -----------------------------------------
             * 5. LIMPIEZA
             * -----------------------------------------
             */

            setTimeout(function() {

                /*
                 * A deja de existir visualmente.
                 */
                $currentCard.removeClass(
                    'active leaving-left leaving-right'
                );


                /*
                 * B queda como única imagen activa.
                 */
                $targetCard.removeClass(
                    'enter-right enter-left'
                );


                $targetCard.addClass('active');


                /*
                 * Ya podemos permitir otra transición.
                 */
                isAnimating = false;

            }, transitionDuration);

        });

    });

})(jQuery);