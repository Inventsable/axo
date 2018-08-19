# axo

Collaboration with [nimbling](https://github.com/nimbling) to unify [his SSR and ISO scripts](https://github.com/nimbling/Nimbling_Scripts).

To-dos:
* Correct axo40-10's sides
* Correct axo10-40's sides
* Use `tag` property of pathItem to mark object's orientation
* UI segment lights up for any tagged items
* Snap/scrunch items together using orientation and corresponding sides

## wakeful state:

![preview](https://thumbs.gfycat.com/PoorColorfulAmericanredsquirrel-size_restricted.gif)

Transition is too heavy here, should probably only fade color to monochromatic.

## UI construction:

![UI build](https://thumbs.gfycat.com/FluidBeneficialAmericanmarten-size_restricted.gif)

^ From `resources/axoMenu1040.ai`. I don't think there's a need for inside arrows because the shape of the menu organically creates them, using camouflaged strokes on these gives nice and seamless event listeners too. SVGs need to use the `pointer-events` property:

``` css
/* use this on parent SVG elements to click through them */
.group {
  pointer-events: none;
}

/* Redeclare pointer-events inside child to reactivate click / mouseover / etc */
.inside-arrow {
  /* pointer-events is largely SVG-specific */

  /* pointer-events: fill; */
  /* pointer-events: stroke; */
  pointer-events: all;
}
```

## 30 passing:

![hello](https://thumbs.gfycat.com/DearestLazyCarpenterant-size_restricted.gif)

![hello](https://thumbs.gfycat.com/PeacefulUnripeHellbender-size_restricted.gif)

## always awake with bumpers:

![40-10](https://thumbs.gfycat.com/WelldocumentedPiercingAmericanwirehair-size_restricted.gif)

^ axo1040 isn't ready yet.
