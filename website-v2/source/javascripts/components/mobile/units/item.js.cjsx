App.Components.Units.Item = React.createClass
  displayName: "UnitItem"
  mixins: [App.Mixins.SVG, App.Mixins.Formatter]

  render: ->
    <li class="table-view-cell media unit">
      <a href="#units/<%= @model.id %>">
        <img class="media-object pull-left" src="<%= @model.thumbnailUrl() %>">
        <svg class="media-graphics element pull-right" width="80" height="80">
          <polygon xmlns="http://www.w3.org/2000/svg" points="<%= @getBackgroundPolygonPointsString(80, 40) %>" class="element-background"/>
          <polygon xmlns="http://www.w3.org/2000/svg" points="<%= @getBackgroundPolygonPointsString(80, 26.7) %>" class="element-background"/>
          <polygon xmlns="http://www.w3.org/2000/svg" points="<%= @getBackgroundPolygonPointsString(80, 13.3) %>" class="element-background"/>
          <polygon xmlns="http://www.w3.org/2000/svg" points="<%= @model.getElementPolygonPointsString(80, 20) %>" class="<%= "element-#{key}" if key = @model.getElementKey() %>"/>
        </svg>
        <div class="media-body">
          <h4 class="media-title">
            <%= @model.getTitleString() %>
            <small><%= @model.getRareString() %></small>
          </h4>
          <div class="media-info-group">
            <p class="media-info">
              生命：<span id="life"><%= @model.get("life") %></span><br>
              攻击：<span id="atk"><%= @model.get("atk") %></span><br>
              攻距：<%= @model.getString("aarea") %><br>
              攻数：<%= @model.getString("anum") %><br>
            </p>
            <p class="media-info">
              攻速：<%= @model.getString("aspd") %><br>
              韧性：<%= @model.getString("tenacity") %><br>
              移速：<%= @model.getString("mspd") %><br>
              多段：<%= @model.getString("hits") %><br>
            </p>
            <p class="media-info hidden-xs">
              成长：<%= @model.getTypeString() %><br>
              火：<%= @model.getElementPercentString("fire") %><br>
              水：<%= @model.getElementPercentString("aqua") %><br>
              风：<%= @model.getElementPercentString("wind") %><br>
            </p>
            <p class="media-info hidden-sm">
              光：<%= @model.getElementPercentString("light") %><br>
              暗：<%= @model.getElementPercentString("dark") %><br>
              DPS：<span id="dps"><%= @model.get("dps") %></span><br>
              总DPS：<span id="mdps"><%= @model.get("mdps") %></span><br>
            </p>
          </div>
        </div>
      </a>
    </li>
