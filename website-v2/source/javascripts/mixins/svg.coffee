App.Mixins.SVG =

  getPolygonPointsString: (ps) ->
    ret = []
    for p in ps
      ret.push "#{p.x},#{p.y}"
    ret.join(" ")

  getBackgroundPolygonPointsString: (l, r) ->
    c = { x: l/2, y: l/2 }
    ret = []
    for i in [0..4]
      a = (i * 72 - 90) * (Math.PI * 2) / 360
      ret.push { x: c.x+Math.cos(a)*r, y: c.y+Math.sin(a)*r }
    @getPolygonPointsString(ps)
