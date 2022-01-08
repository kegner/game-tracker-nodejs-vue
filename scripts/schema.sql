DROP TABLE IF EXISTS widgets;
DROP TABLE IF EXISTS dashboards;

CREATE TABLE dashboards (
    id varchar PRIMARY KEY,
    parent_dashboard_id varchar,
    title varchar NOT NULL
);

CREATE TABLE widgets (
    id varchar PRIMARY KEY,
    parent_widget_id varchar,
    dashboard_id varchar,
    layout varchar NOT NULL,
    title varchar NOT NULL,
    url varchar NOT NULL,
    iframe_wrapper boolean,
    channel varchar,
    url_parameter varchar,
    is_locked boolean,
    CONSTRAINT fk_dashboard_id
      FOREIGN KEY(dashboard_id) 
	  REFERENCES dashboards(id)
);